// 1.4-ManageObservableSubscriptionsWithUnsubscribe

import {Observable} from "rxjs";

const observer = {
    next: value => console.log('next', value),
    error: error => console.log('error', error),
    complete: () => console.log('complete!')
};

const observable = new Observable(subscriber => {
    let counter = 0;
    const intervalId = setInterval(() => {
        console.log('Emit =>', counter)
        subscriber.next(counter); //emit counter
        counter += 1;
        if (counter > 60) {
            subscriber.complete(); // emit complete to end te stream
        }
    }, 1000); // every second

    // returns a function that that is called after execution,
    // in this case, it clears the interval in order to prevent
    // it is running forever
    // clearInterval(intervalId)
    return () => {
        // interval should be cleared !!!
        console.log('clearInterval')
        clearInterval(intervalId)
    }
})

const subscription = observable.subscribe(observer);

const subscriptionTwo = observable.subscribe(observer);

// add second subscription to the first to be able to unsubsribe both in one statement
subscription.add(subscriptionTwo);

setTimeout(() => {
    // unsubscribe both subscriptions
    subscription.unsubscribe(); // complete will not be fired !!!
}, 3500)
setTimeout(() => {
    // unsubscribe before complete
    // now obsolete because second subscription is added to first subscription.
    subscriptionTwo.unsubscribe(); // complete will not be fired !!!
}, 5000)

