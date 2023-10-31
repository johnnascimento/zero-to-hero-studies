// imports
// import getSimilarBoats
import { LightningElement, wire, api } from 'lwc';
import getSimilarBoats from '@salesforce/apex/BoatDataService.getSimilarBoats';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

// Const
const SIMILAR_BOAT_BY_LABEL = 'Similar boats by ';
const ERROR_TITLE = 'Error found'
const ERROR_VARIANT = 'Error';
const ERROR_MESSAGE = 'No data was retrieved'

export default class SimilarBoats extends NavigationMixin(LightningElement) {
    // Private
    relatedBoats;
    @api boatId;
    error;

    // public
    @api get recordId() {
        // returns the boatId
        return this.boatId;
    }

    set recordId(value) {
        // sets the boatId value
        // sets the boatId attribute
        this.boatId = value;
        this.setAttribute('boatId', value);
    }

    // public
    @api similarBy;

    // Wire custom Apex call, using the import named getSimilarBoats
    // Populates the relatedBoats list
    @wire(getSimilarBoats, { boatId: '$boatId', similarBy: '$similarBy' })
    similarBoats({ error, data }) {
        if (data) {
            this.relatedBoats = data;
        } else if (error) {
            this.error = error;

            const toastMsg = new ShowToastEvent({
                title: ERROR_TITLE,
                message: ERROR_MESSAGE,
                variant: ERROR_VARIANT
            });

            this.dispatchEvent(toastMsg);
        }
    }

    get getTitle() {
        return 'Similar boats by ' + this.similarBy;
    }

    get noBoats() {
        return !(this.relatedBoats && this.relatedBoats.length > 0);
    }

    // Navigate to record page
    openBoatDetailPage(event) {
        const recordId = event.detail.boatId;
        console.log('recordId', recordId);

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: 'Boat__c',
                actionName: 'view'
            }
        });
    }
}