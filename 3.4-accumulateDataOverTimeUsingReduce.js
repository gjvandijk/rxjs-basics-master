// 3.4 Accumulate data over time using reduce

import {reduce, take} from "rxjs/operators";
import {from, interval} from "rxjs";

const numbers = [1, 2, 3, 4, 5]
// array.reduce !!!
const totalReducer = (accumulator, currentValue) => {
    console.log({accumulator, currentValue});
    return accumulator + currentValue;
}
// ======================================================
// example array.reduce function:
// ======================================================
// const total = numbers.reduce(totalReducer, 0);
// console.log('array.reduce function:', {total});

// ======================================================
// display total using an observable
// ======================================================

// from(numbers).pipe(
//     reduce(totalReducer, 0)
// ).subscribe(console.log);

// ======================================================
// display intermediate results using interval
// in which case last total value will not be emitted:
// use scan instead !!!
// ======================================================

interval(500).pipe(
    take(5),
    reduce(totalReducer, null)
).subscribe
({
    next: console.log,
    complete: () => console.log('Complete!')
});

