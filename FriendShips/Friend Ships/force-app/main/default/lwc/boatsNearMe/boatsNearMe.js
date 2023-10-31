import { LightningElement, wire, api } from 'lwc';
import getBoatsByLocation from '@salesforce/apex/BoatDataService.getBoatsByLocation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// imports
const LABEL_YOU_ARE_HERE = 'You are here!';
const ICON_STANDARD_USER = 'standard:user';
const ERROR_TITLE = 'Error loading Boats Near Me';
const ERROR_VARIANT = 'error';

export default class BoatsNearMe extends LightningElement {
    @api boatTypeId;
    mapMarkers = [];
    isLoading = true;
    isRendered;
    latitude;
    longitude;

    // Add the wired method from the Apex Class
    // Name it getBoatsByLocation, and use latitude, longitude and boatTypeId
    // Handle the result and calls createMapMarkers
    @wire(getBoatsByLocation, {
        latitude: '$latitude',
        longitude: '$longitude',
        boatTypeId: '$boatTypeId'
    })
    wiredBoatsJSON({error, data}) {
        if (data) {
            this.createMapMarkers(JSON.parse(data));
        } else if (error) {
            const toast = new ShowToastEvent(
                {
                    title: ERROR_TITLE,
                    message: error.message,
                    variant: ERROR_VARIANT,
                }
            );

            this.dispatchEvent(toast);

            this.mapMarkers = [];
        }

        this.isLoading = false;
    }

    // Controls the isRendered property
    // Calls getLocationFromBrowser()
    renderedCallback() {
        if (!this.isRendered) {
            this.getLocationFromBrowser();
        }

        this.isRendered = true;
    }

    // Gets the location from the Browser
    // position => {latitude and longitude}
    getLocationFromBrowser() {
        if (navigator && !navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            position => {
                console.log("Your current position is:");
                console.log(`Latitude : ${position.coords.latitude}`);
                console.log(`Longitude: ${position.coords.longitude}`);
                console.log(`More or less ${position.coords.accuracy} meters.`);

                this.latitude = position.coords.latitude
                this.longitude = position.coords.longitude
            },

            error => {
                console.warn(`ERROR(${error.code}): ${error.message}`);
            }
        );
    }

    // Creates the map markers
    createMapMarkers(boatData) {
        const newMarkers = boatData.map(boat => {
            console.log('createMapMarkers boat', boat);

            return {
                title: boat.Name,
                location: {
                    Longitude: boat.Geolocation__Latitude__s,
                    Latitude: boat.Geolocation__Longitude__s
                }
            }
        });

        newMarkers.unshift({
            title: LABEL_YOU_ARE_HERE,
            icon: ICON_STANDARD_USER,
            location: {
                Latitude: this.latitude,
                Longitude: this.longitude
            }
        });

        this.mapMarkers = newMarkers;
    }
}