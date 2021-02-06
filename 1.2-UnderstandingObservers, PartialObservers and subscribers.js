// create your first observable
import {Observable} from "rxjs";

const observable = new Observable(subscriber => {
    subscriber.next('Hello');
    subscriber.next('World');
    subscriber.complete();
})

const observer = {
    next: value => console.log('next', value),
    error: error => console.log('error', error),
    complete: () => console.log('complete!')
};

// using named observer
observable.subscribe(observer);

// using anonymous observer
observable.subscribe(
    value => console.log('next1', value),
    error => console.log('error1', error),
    () => console.log('complete1!')
);

// using anonymous observer
observable.subscribe(
    value => console.log('next2', value),
    null, // Provide null in order to prevent observable emitting an error;
    () => console.log('complete2!')
);
