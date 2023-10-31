import { LightningElement, wire } from 'lwc';

// Import to retrieve values from the fields inside BOAT_FIELDS
import { NavigationMixin } from 'lightning/navigation';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

// Custom Labels Imports
// Import labelDetails for Details
// Import labelReviews for Reviews
// Import labelAddReview for Add_Review
// Import labelFullDetails for Full_Details
// Import labelPleaseSelectABoat for Please_select_a_boat
import labelDetails from '@salesforce/label/c.Details';
import labelReviews from '@salesforce/label/c.Reviews';
import labelAddReview from '@salesforce/label/c.Add_Review';
import labelFullDetails from '@salesforce/label/c.Full_Details';
import labelPleaseSelectABoat from '@salesforce/label/c.Please_select_a_boat';

// Import BOAT_ID_FIELD for the Boat Id
// Import BOAT_NAME_FIELD for the boat Name
import BOAT_ID_FIELD from '@salesforce/schema/Boat__c.Id';
import BOAT_NAME_FIELD from '@salesforce/schema/Boat__c.Name';
const BOAT_FIELDS = [BOAT_ID_FIELD, BOAT_NAME_FIELD];

// Import BOATMC from the message channel
import BOATMC from '@salesforce/messageChannel/BoatMessageChannel__c';
import { subscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';

export default class BoatDetailTabs extends NavigationMixin(LightningElement) {
    boatId;

    @wire(MessageContext) messageContext;
    @wire(getRecord, { recordId: '$boatId', fields: BOAT_FIELDS }) wiredRecord;

    label = {
        labelDetails,
        labelReviews,
        labelAddReview,
        labelFullDetails,
        labelPleaseSelectABoat,
    };

    // Decide when to show or hide the icon
    // returns 'utility:anchor' or null
    get detailsTabIconName() {
        return this.wiredRecord.data ? 'utility:anchor' : null;
    }

    // Utilize getFieldValue to extract the boat name from the record wire
    get boatName() {
        return getFieldValue(this.wiredRecord.data, BOAT_NAME_FIELD)
    }

    // Private
    subscription = null;

    // Subscribe to the message channel
    subscribeMC() {
        // local boatId must receive the recordId from the message
        if (this.subscription) {
            return;
        }

        // Subscribe to the message channel to retrieve the recordId and explicitly assign it to boatId.
        this.subscription = subscribe(this.messageContext, BOATMC, (message) => { this.boatId = message.recordId }, { scope: APPLICATION_SCOPE });
    }

    // Calls subscribeMC()
    connectedCallback() {
        this.subscribeMC();
    }

    // Navigates to record page
    navigateToRecordViewPage() {
		// Navigate to boat record page
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
                recordId: this.boatId,
				objectApiName: 'Boat__c',
				actionName: 'view',
			},
		});
    }

    // Navigates back to the review list, and refreshes reviews component
    handleReviewCreated() {
        const tmpl = this.template;

        tmpl.querySelector('lightning-tabset').activeTabValue = 'reviews';
        tmpl.querySelector('c-boat-reviews').refresh();
    }
}
