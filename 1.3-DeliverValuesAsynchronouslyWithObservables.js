// Deliver values asynchronously with observables

import {Observable} from "rxjs";

const observer = {
    next: value => console.log('next', value),
    error: error => console.log('error', error),
    complete: () => console.log('complete!')
};

const observable = new Observable(subscriber => {
    let counter = 0;
    const intervalId = setInterval(() => {
        subscriber.next(counter); //emit counter
        counter += 1;
        if (counter > 5) {
            subscriber.complete(); // emit complete to end te stream
        }
    }, 1000); // every second

    // returns a function that that is called after execution,
    // in this case, it clears the interval in order to prevent
    // it is running forever
    // clearInterval(intervalId)
    return () => {
        // interval should be cleared !!!
        console.log('clearInterval', intervalId)
        clearInterval(intervalId)
    }
})

console.log('Before');
observable.subscribe(observer);
console.log('After'); // displays before first emitted value

