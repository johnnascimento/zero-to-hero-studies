import { LightningElement } from 'lwc';

export default class Augmentor extends LightningElement {
    startCounter = 0;
    factors = [500, 750,1000, 1250, 1500, 1750];
    handleStartChange(event) {
        this.startCounter = parseInt(event.target.value);
    }
    handleMaximizeCounter(event) {
        const factor = parseInt(event.target.dataset.factor);
        this.template.querySelector('c-numerator').maximizeCounter(factor);
    }
}