// 3.5 Manage state changes incrementally with scan

import {map, reduce, scan, take, tap} from "rxjs/operators";
import {from, interval} from "rxjs";


// ======================================================
// display running totals using an observable with scan
// ======================================================
// array.reduce function

// const totalReducer = (accumulator, currentValue) => {
//      // console.log({accumulator, currentValue});
//      return accumulator + currentValue;
//  }
//  const numbers = [1, 2, 3, 4, 5]
//  from(numbers).pipe(
//      scan(totalReducer, 0)
//  ).subscribe(console.log);

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

const name$ = state$.pipe(
    map(state => state.name),
    // tap(console.log)
);

name$.subscribe(console.log);
