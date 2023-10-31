import { LightningElement, wire, track, api } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getBoats from '@salesforce/apex/BoatDataService.getBoats';
import updateBoatList from '@salesforce/apex/BoatDataService.updateBoatList';

import BoatMC from '@salesforce/messageChannel/BoatMessageChannel__c';
// ...
const SUCCESS_TITLE = 'Success';
const MESSAGE_SHIP_IT     = 'Ship it!';
const SUCCESS_VARIANT     = 'success';
const ERROR_TITLE   = 'Error';
const ERROR_VARIANT = 'error';

export default class BoatSearchResults extends LightningElement {
    @track selectedBoatId;
    columns = [
        { label: 'Name', fieldName: 'Name', editable: true },
        { label: 'Price', fieldName: 'Price__c', type: 'currency'},
        { label: 'Length', fieldName: 'Length__c', type: 'number'},
        { label: 'Description', fieldName: 'Description__c'}
    ];
    draftValues = [];
    @track boatTypeId = '';
    boats;
    isLoading = false;

    // wired message context
    @wire(MessageContext) messageContext;

    // wired getBoats method
    @wire(getBoats, { boatTypeId: '$boatTypeId' })
    wiredBoats(result) {
        this.boats = result;

        if (result.data) {
            const message = {
                boats: result.data
            };

			publish(this.messageContext, BoatMC, message);
        }
    }

    // public function that updates the existing boatTypeId property
    // uses notifyLoading
    @api searchBoats(boatTypeId) {
        this.isLoading = true;
        this.notifyLoading(this.isLoading);
        this.boatTypeId = boatTypeId;
        console.log('searchBoats function boatTypeId', boatTypeId);
    }

    // this public function must refresh the boats asynchronously
    // uses notifyLoading
    @api async refresh() {
        this.isLoading = true;
        this.notifyLoading(this.isLoading);

        await refreshApex(this.boats);

        this.isLoading = false;
        this.notifyLoading(this.isLoading);
    }

    // this function must update selectedBoatId and call sendMessageService
    updateSelectedTile(event) {
        console.log('updateSelectedTile event', event.detail.boatId);

        console.log('selectedBoatId', this)

        this.selectedBoatId = event.detail.boatId;
        console.log('selectedBoatId', this.selectedBoatId)

        this.sendMessageService(this.selectedBoatId);
    }

    // Publishes the selected boat Id on the BoatMC.
    sendMessageService(boatId) {
        console.log('sendMessageService boatId', boatId)
        // explicitly pass boatId to the parameter recordId
        publish(this.messageContext, BoatMC, { recordId: boatId })
    }

    // The handleSave method must save the changes in the Boat Editor
    // passing the updated fields from draftValues to the
    // Apex method updateBoatList(Object data).
    // Show a toast message with the title
    // clear lightning-datatable draft values
    handleSave(event) {
        // notify loading
        const updatedFields = event.detail.draftValues;
        // Update the records via Apex
        updateBoatList({data: updatedFields})
        .then((result) => {
            const toastMsg = new ShowToastEvent(
                {
                    title: SUCCESS_TITLE,
                    message: MESSAGE_SHIP_IT,
                    variant: SUCCESS_VARIANT
                }
            );

            this.dispatchEvent(toastMsg);
            this.refresh();

            return result;
        })
        .catch(error => {
            const toastErrorMsg = new ShowToastEvent({
                title: ERROR_TITLE,
                message: error.message,
                variant: ERROR_VARIANT,
            });

            this.dispatchEvent(toastErrorMsg);
        })
        .finally((data) => {
            console.log('finally: data', data);
            this.draftValues = [];
        });
    }

    // Check the current value of isLoading before dispatching the doneloading or loading custom event
    notifyLoading(isLoading) {
        if (isLoading) {
            this.dispatchEvent(new CustomEvent('loading'));
        } else {
            this.dispatchEvent(new CustomEvent('doneloading'));
        }
    }
}