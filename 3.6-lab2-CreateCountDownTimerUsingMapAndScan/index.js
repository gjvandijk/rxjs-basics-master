// 3.6 lab2-Create a countdown timer using map and scan

import {filter, mapTo, scan} from "rxjs/operators";
import {interval} from "rxjs";

console.log('<START>');

// create stream of integer values
const counter$ = interval(1000);


const increment = -1;
const start = 10;

const countdown = document.getElementById('countdown')
const message = document.getElementById('message')

// Warning: counter does not complete and is still running !!!
counter$.subscribe((value) => {
    console.log('counter: ', value);
})

const countdown$ = counter$.pipe(
    // transform counter value to constant
    mapTo(increment),

    scan((acc, curr) => {
        return acc + curr;
    }, start), // provide seed value for accumulator
    // prevent emitting negative values
    filter((value) => (value >= 0))
);

countdown$.subscribe(value => {
    countdown.innerHTML = value.toString();
    if (!value) {
        message.innerHTML = 'Liftoff!!!'
    }

})
;

console.log('<END>');
