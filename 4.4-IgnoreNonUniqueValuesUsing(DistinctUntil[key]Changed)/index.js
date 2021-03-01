// 4.4 Ignore non unique values using distinctUntilChanged or distinctUntilKeyChanged

import {
    distinctUntilChanged,
    distinctUntilKeyChanged,
    filter,
    map,
    mapTo,
    scan,
    takeUntil,
    takeWhile,
    tap
} from "rxjs/operators";
import {from, fromEvent, interval, of} from "rxjs";

console.log('<START>');

// create stream of integer values
const counter$ = interval(1000);
const click$ = fromEvent(document, 'click')

// =============================================================
// Simple example of distinctUntilChanged:
// =============================================================
const numbers$ = of(1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 5, 5, 5, 5, 5);
numbers$
    .pipe(
        // distinctUntilChanged(), // no arguments required
        tap(console.log)
    )
    .subscribe();

// ======================================================
// Display user state changes over time
// ======================================================
const user = [
    {name: 'Brian', loggedIn: false, token: null},
    {name: 'Brian', loggedIn: true, token: 'abc'},
    {name: 'Brian', loggedIn: true, token: '123'}
]
const state$ = from(user).pipe(
    // tap(console.log),
    scan((accumulator, currentValue) => {
        return {...accumulator, ...currentValue};
    }, {})
);
state$.subscribe(console.log);

const uniqueName1$ = state$.pipe(
    // determine if name has been changed ...
    distinctUntilChanged((prev, curr) => {
        return prev.name === curr.name;
    }),
    map(state => state.name),
    // tap(console.log)
);
uniqueName1$.subscribe((res) => console.log('distinctUntilChanged: ', res));

const uniqueName2$ = state$.pipe(
    // determine if key property name has been changed ...
    distinctUntilKeyChanged('name'),
    map(state => state.name),
    // tap(console.log)
);
uniqueName2$.subscribe((res) => console.log('distinctUntilKeyChanged: ', res));


console.log('<END>');
