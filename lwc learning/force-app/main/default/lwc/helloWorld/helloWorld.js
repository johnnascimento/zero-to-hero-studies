import { LightningElement, track } from 'lwc';

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

    // @track is a decorate which gives extra functionalities to the tracked either property or method
    // Although this approach is acceptable, it's better reassign the value of this object as a best practice
    // To not overload our frontend
    // This also works with array: userList = [ 'a', 'b', 'c' ];
    // @track address = {
    //     city: 'Melbourne',
    //     postcode: 3008,
    //     country: 'Australia'
    // }

    address = {
        city: 'Melbourne',
        postcode: 3008,
        country: 'Australia'
    }

    userList = [
        'a',
        'b',
        'c'
    ];

    users = [
        "John",
        "Alana",
        "Barbara"
    ]

    num1 = 10;
    num2 = 15;

    get firstUser() {
        return this.users[0];
    }

    get secondUserUpperCase() {
        return this.users[1].toUpperCase();
    }

    get multiply() {
        return this.num1 * this.num2;
    }

    trackHandler(event) {
        if (event.target.value.length) {
            this.address = {
                ...this.address,
                'city': event.target.value
            };
        }
    }
}