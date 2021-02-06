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

observable.subscribe(observer);
