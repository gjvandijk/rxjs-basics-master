// 2.2-ofAndRangeOperators
// Creation Operator:
//    Create observables from static values using of
// Values are emitted synchonously upon subscription

import {of, range} from "rxjs";

const observer = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('Complete!')
};

const of$ = of(1,2,3,4,5);
const range$ = range(1,5)
of$.subscribe(observer);
range$.subscribe(observer);

console.log('hello world');
