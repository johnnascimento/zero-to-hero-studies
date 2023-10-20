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
    @wire(getBoatTypes, {boatType: '$selectedBoatTypeId'})
    boatTypes({ error, data }) {
        console.log('boatTypes data', data);

        if (data) {
            this.searchOptions = data.map(type => {
                console.log('searchOptions - type', type);

                // TODO: complete the logic
                return { label: type.name, value: type.id }
            });
            this.searchOptions.unshift({ label: 'All Types', value: '' });
        } else if (error) {
            console.log('searchOptions - error', error);

            this.searchOptions = undefined;
            this.error = error;
        }
    }

    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
        console.log('handleSearchOptionChange - event', event);
        console.log('handleSearchOptionChange - this.selectedBoatTypeId', this.selectedBoatTypeId);
        // Create the const searchEvent
        // searchEvent must be the new custom event search
        const searchEvent = new CustomEvent('search', {
            detail: this.selectedBoatTypeId.boatTypeId
        });
        this.dispatchEvent(searchEvent);
    }
}