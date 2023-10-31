import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {
    // For storing answers
    selected = {};
    correctAnswers = 0;
    isSubmitted = false;

    myQuestions = [
        {
            id: "Question1",
            question: "Which one of the following is not a template loop?",
            answers: {
                a: 'for:each',
                b: 'iterator',
                c: 'map loop'
            },
            correctAnswer: 'c'
        },
        {
            id: "Question2",
            question: "Which one of the following is not a template loop?",
            answers: {
                a: 'for:each',
                b: 'map loop',
                c: 'iterator'
            },
            correctAnswer: 'b'
        },
        {
            id: "Question3",
            question: "Which one of the following is not a template loop?",
            answers: {
                a: 'map loop',
                b: 'for:each',
                c: 'iterator'
            },
            correctAnswer: 'a'
        }
    ];

    get isScoredFull() {
        return `slds-text-heading_large ${this.myQuestions.length === this.correctAnswers ? 'slds-text-color_success' : 'slds-text-color_error'}`;
    }

    get formNotReady() {
        return (Object.keys(this.selected).length !== this.myQuestions.length);
    }

    changeHandler(ev) {
        console.log('name', ev.target.name);
        console.log('value', ev.target.value);
        console.log('type', ev.target.type);

        const {name, value, type} = ev.target;

        this.selected = {
            ...this.selected,
            [name]:value
        };
    }

    submitHandler(event) {
        console.log('submitHandler event', event);
        event.preventDefault();

        this.correctAnswers = this.myQuestions.filter(
            item => {
                console.log('item.correctAnswer', item.correctAnswer);
                console.log('this.selected[item.id]', this.selected[item.correctAnswer]);

                return this.selected[item.id] === item.correctAnswer
            }
        ).length;

        this.isSubmitted = true;

        console.log('this.correctAnswers', this.correctAnswers);
    }

    resetHandler() {
        this.selected = {};
        this.correctAnswers = 0;
        this.isSubmitted = false;
    }
}