// imports
// import getBoatTypes from the BoatDataService => getBoatTypes method';
import { LightningElement, wire } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = '';

    // Private
    error = undefined;

    searchOptions;

    // Wire a custom Apex method
    @wire(getBoatTypes)
    boatTypes({ error, data }) {
        console.log('boatTypes data', data);
        console.log('boatTypes this.searchOptions', this.searchOptions);

        if (data) {
            console.log('searchOptions - IF data', data);

            this.searchOptions = data.map(type => {
                console.log('searchOptions - type', type);

                // TODO: complete the logic
                return { label: type.Name, value: type.Id }
            });

            this.searchOptions.unshift({ label: 'All Types', value: '' });

            console.log('this.searchOptions - AFTER', this.searchOptions);
        } else if (error) {
            console.log('searchOptions - error', error);

            this.searchOptions = undefined;
            this.error = error;
        }
    }

    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
        this.selectedBoatTypeId = event.detail.value;

        // Create the const searchEvent
        // searchEvent must be the new custom event search
        const searchEvent = new CustomEvent('search', {
            detail: { 
                boatTypeId: this.selectedBoatTypeId
            }
        });
        this.dispatchEvent(searchEvent);
    }
}