// imports
import { NavigationMixin } from 'lightning/navigation';
import { LightningElement } from 'lwc';

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
    searchBoats(event) { }

    createNewBoat() {
        console.log('event');
		// Navigate to bear record page
		this[NavigationMixin.Navigate]({
			type: 'standard__objectPage',
			attributes: {
				objectApiName: 'Boat__c',
				actionName: 'new',
			},
		});
    }
}