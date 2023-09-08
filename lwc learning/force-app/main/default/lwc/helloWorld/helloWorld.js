import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    fullName = 'Zero to Hero';
    title = 'aura';

    changeHandler(event) {
        if (event.target.value.length) {
            this.title = event.target.value;

            return this;
        }

        this.title = 'aura';

        return this;
    }

    address = {
        
    }
}