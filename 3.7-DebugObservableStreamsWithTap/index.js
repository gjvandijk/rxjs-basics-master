// 3.7 Debug your observable streams with tap

import {filter, map, mapTo, scan, tap} from "rxjs/operators";
import {interval, of} from "rxjs";

console.clear();
console.log('<START>');
// ==========================================================================
// simple tap example
// ==========================================================================
const numbers$ = of(1, 2, 3, 4, 5);
const mappedNumbers$ = numbers$.pipe(
    // Note that beside next, also error and complete can be used for side effects
    tap({
        next: value => {
            console.log('before map: ', value);
            return -1 // return values of tap are completely ignored
        },
        error: error => console.log(error.name),
        complete: () => console.log('completed')
    }),
    map(value => value * 10),
    tap(value => console.log('after map: ', value),
        error => console.log(error.name),
        () => console.log('completed')),
    )
;
mappedNumbers$.subscribe(value => {
    console.log('from subscribe: ', value)
})

// =========================================================================
// Debug lab2: countdowm timer
// =========================================================================

// create stream of integer values
const counter$ = interval(1000);

const increment = -1;
const start = 10;

const countdown = document.getElementById('countdown')
const message = document.getElementById('message')

const countdown$ = counter$.pipe(
    // transform counter value to constant
    mapTo(increment),

    scan((acc, curr) => {
        return acc + curr;
    }, start),
    tap(console.log), // show counter is still emitting before filter
    // provide seed value for accumulator
    // prevent emitting negative values
    filter((value) => (value >= 0)),
    tap(console.log), // show counter is not emitting after filter

);

countdown$.subscribe(value => {
    countdown.innerHTML = value.toString();
    if (!value) {
        message.innerHTML = 'Liftoff!!!'
    }

})
;

console.log('<END>');
