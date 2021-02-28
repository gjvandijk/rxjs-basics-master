// 4.3 Complete a stream based on another stream using takeUntil

import {filter, mapTo, scan, takeUntil, takeWhile, tap} from "rxjs/operators";
import {from, fromEvent, interval} from "rxjs";

console.log('<START>');

// create stream of integer values
const counter$ = interval(1000);
const click$ = fromEvent(document, 'click')

// =============================================================
// Simple example of takeUntil:
// =============================================================

counter$.pipe(
    takeUntil(click$)
).subscribe(console.log);


// =============================================================
// Stop countdown timer when stream fromEvent starts emitting
// =============================================================

const increment = -1;
const start = 10;

const countdown = document.getElementById('countdown')
const message = document.getElementById('message')
const abortButton = document.getElementById('abort')

const abortClick$ = fromEvent(abortButton, 'click')


const countdown$ = counter$.pipe(
    // transform counter value to constant
    mapTo(increment),
    scan((acc, curr) => {
        return acc + curr;
    }, start), // provide seed value for accumulator
    tap(console.log),
    // prevent emitting negative values
    takeWhile((value) => (value >= 0), false), // do not emit last value
    takeUntil(abortClick$),
);

countdown$.subscribe(value => {
    countdown.innerHTML = value.toString();
    if (!value) {
        message.innerHTML = 'Liftoff!!!'
    }
})
;

console.log('<END>');
