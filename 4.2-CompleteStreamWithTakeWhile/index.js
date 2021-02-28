// 4.2 Complete stream with takeWhile

import {filter, first, map, mapTo, scan, take, takeWhile, tap} from "rxjs/operators";
import {fromEvent, interval, of} from "rxjs";

console.clear();
console.log('<START>');


const click$ = fromEvent(document, 'click');
// ==========================================================================
// get coordinates of mouse pointer at first click event using take
// ==========================================================================
click$.pipe(
    map(event => ({x: event.clientX, y: event.clientY})),
    takeWhile(({y}) => y <= 200, true) // true: also emit last value
      // complete when y <= 200
).subscribe({next: console.log, complete: () => console.log('Take Completed')})

console.log('<END>');
