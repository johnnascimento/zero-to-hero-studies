import { LightningElement } from 'lwc';

export default class Looping extends LightningElement {
    carList = [
        "Pagani",
        "Ford GTI",
        "Mazda RX-7",
        "Mercedes",
        "Porsche",
        "Bugatti"
    ];

    ceoList = [
        {
            id: 1,
            company: 'Google',
            name: 'Sundar Pichai'
        },
        {
            id: 2,
            company: 'Apple',
            name: 'Tim Cook'
        },
        {
            id: 3,
            company: 'Facebook',
            name: 'Mark Zuckerberg'
        },
        {
            id: 4,
            company: 'Amazon.com',
            name: 'Jeff Bezos'
        }
    ]
}