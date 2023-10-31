// imports
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

// NavigationMixin
export default class BoatSearch extends NavigationMixin(LightningElement) {
    isLoading = false;

    // Handles loading event
    handleLoading() {
        this.isLoading = true;
    }

    // Handles done loading event
    handleDoneLoading() {
        this.isLoading = false;
    }

    // Handles search boat event
    // This custom event comes from the form
    searchBoats(event) {
        const boatTypeId = event.detail.boatTypeId;
        const searchResult = this.template.querySelector('c-boat-search-results');

        searchResult.searchBoats(boatTypeId);

        console.log('event', event);
        console.log('event.detail', event.detail);
        console.log('event.detail.boatTypeId', event.detail.boatTypeId);
        console.log('boatTypeId', boatTypeId);
        console.log('searchResult', searchResult);
    }

    createNewBoat() {
        console.log('event');
		// Navigate to boat record page
		this[NavigationMixin.Navigate]({
			type: 'standard__objectPage',
			attributes: {
				objectApiName: 'Boat__c',
				actionName: 'new',
			},
		});
    }
}