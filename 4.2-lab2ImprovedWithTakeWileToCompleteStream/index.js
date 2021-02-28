// 4.2 lab2-Create a countdown timer using map and scan (improved)

import {filter, mapTo, scan, takeWhile, tap} from "rxjs/operators";
import {interval} from "rxjs";

console.log('<START>');

// create stream of integer values
const counter$ = interval(1000);


const increment = -1;
const start = 10;

const countdown = document.getElementById('countdown')
const message = document.getElementById('message')

// Warning: counter does not complete and is still running !!!

const countdown$ = counter$.pipe(
    // transform counter value to constant
    mapTo(increment),
    scan((acc, curr) => {
        return acc + curr;
    }, start), // provide seed value for accumulator
    tap(console.log),
    // prevent emitting negative values
    takeWhile((value) => (value >= 0), false) // do not emit last value
);

countdown$.subscribe(value => {
    countdown.innerHTML = value.toString();
    if (!value) {
        message.innerHTML = 'Liftoff!!!'
    }
})
;

console.log('<END>');
