// 4.1 Complete stream with take and first

import {filter, first, map, mapTo, scan, take, tap} from "rxjs/operators";
import {fromEvent, interval, of} from "rxjs";

console.clear();
console.log('<START>');
// ==========================================================================
// simple take example
// ==========================================================================
const numbers$ = of(1, 2, 3, 4, 5);
numbers$.pipe(
    take(3)
).subscribe(
    {
        next: console.log,
        complete: () => console.log('completed!')
    }
);

const click$ = fromEvent(document, 'click');
// ==========================================================================
// get coordinates of mouse pointer at first click event using take
// ==========================================================================
click$.pipe(
    // transform event stream to stream of coordinates
    // Note: two ways to return an object
    // 1) using return within {}
    // map(event => {
    //     return {x: event.clientX, y: event.clientY}
    // })
    // 2) without return within ()
    map(event => ({x: event.clientX, y: event.clientY})),
    take(1) // complete after 1 emission
).subscribe({next: console.log, complete: () => console.log('Take Completed')})

// ==========================================================================
// get coordinates of mouse pointer once when condition has been met
// ==========================================================================
click$.pipe(
    // transform event stream to stream of coordinates
    // Note: two ways to return an object
    // 1) using return within {}
    map(event => {
        return {x: event.clientX, y: event.clientY}
    }),
    // 2) without return within ()
    // map(event => ({x: event.clientX, y: event.clientY})),
    first(({y}) => y > 200) // complete after click at location y > 200
).subscribe({next: console.log, complete: () => console.log('First Completed')})


console.log('<END>');
