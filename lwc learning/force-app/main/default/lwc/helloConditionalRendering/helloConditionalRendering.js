import { LightningElement } from 'lwc';

export default class HelloConditionalRendering extends LightningElement {
    isVisible = false
    isInvisible = true;
    isTrue = false;
    name = null;

    handleChange(ev) {
        this.isVisible = ev.target.checked;
        this.isInvisible = !ev.target.checked;
        console.log('isInvisible ', this.isInvisible);
        console.log('isVisible ', this.isVisible);
    }

    handleClick() {
        this.isTrue = !!this.isTrue ? false : true;
        console.log('this.isTrue ', this.isTrue);
    }

    changeHandler(ev) {
        this.name = ev.target.value;
    }

    get helloMethod() {
        return this.name === 'hello';
    }
}