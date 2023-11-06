import { LightningElement } from 'lwc';

export default class HelloQuerySelectorDemo extends LightningElement {
    userNames = [
        'John',
        'Barbara',
        'Alana',
        'Elisene',
        'Geane',
        'Luiz'
    ];

    fetchDetailHandler() {
        const elem = this.template.querySelector('h1');
        elem.style.border = '1px solid crimson';

        console.log('elem.innerText', elem.innerText);


        Array.from(this.template.querySelectorAll('.name')).forEach((item => {
            item.setAttribute('title', item.innerText);

            console.log('item', item.innerText);
        }));

        // lwc:dom manual approach
        const childElem = this.template.querySelector('.child');
        childElem.innerHTML = '<p>Im a child element</p>';
    }
}