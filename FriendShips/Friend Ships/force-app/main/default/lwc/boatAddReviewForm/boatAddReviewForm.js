import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// Imports
// Import BOAT_REVIEW_OBJECT from schema - BoatReview__c
// Import NAME_FIELD from schema - BoatReview__c.Name
// Import COMMENT_FIELD from schema - BoatReview__c.Comment__c
import BOAT_REVIEW_OBJECT from '@salesforce/schema/BoatReview__c';
import NAME_FIELD from '@salesforce/schema/BoatReview__c.Name';
import COMMENT_FIELD from '@salesforce/schema/BoatReview__c.Comment__c';

const SUCCESS_TITLE = 'Review Created!';
const SUCCESS_VARIANT = 'success';
const REVIEW_SUBJECT = 'Review Subject';
const RATING = 'Rating';

export default class BoatAddReviewForm extends LightningElement {
    // Private
    boatId;
    rating;
    boatReviewObject = BOAT_REVIEW_OBJECT;
    nameField = NAME_FIELD;
    commentField = COMMENT_FIELD;
    labelSubject = REVIEW_SUBJECT;
    labelRating = RATING;

    // Public Getter and Setter to allow for logic to run on recordId change
    @api get recordId() {
        return this.boatId;
    }

    set recordId(value) {
        //sets boatId attribute
        //sets boatId assignment
        this.setAttribute('boatId', value);
        this.boatId = value;
    }

    // Gets user rating input from stars component
    handleRatingChanged(event) {
        return this.rating = event.detail.rating;
    }

    // Custom submission handler to properly set Rating
    // This function must prevent the anchor element from navigating to a URL.
    // form to be submitted: lightning-record-edit-form
    handleSubmit(event) {
        event.preventDefault();

        const evFields = event.detail.fields;

        evFields.Rating__c = this.rating;
        evFields.Boat__c = this.boatId;

        this.template.querySelector('lightning-record-edit-form').submit(evFields);
    }

    // Shows a toast message once form is submitted successfully
    // Dispatches event when a review is created
    handleSuccess() {
        // TODO: dispatch the custom event and show the success message
        const createdReviewEvent = new CustomEvent('createreview');
        const toastMg = new ShowToastEvent({
            title: SUCCESS_TITLE,
            variant: SUCCESS_VARIANT
        });

        this.dispatchEvent(toastMg);
        this.handleReset();
        this.dispatchEvent(createdReviewEvent);
    }

    // Clears form data upon submission
    // TODO: it must reset each lightning-input-field
    handleReset() {
        const inputFields = this.template.querySelectorAll('lightning-input-field');

        if (inputFields) inputFields.forEach(field => { field.reset(); });
    }
}
