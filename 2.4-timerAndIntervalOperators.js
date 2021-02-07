// 2.4-timerAndIntervalOperators
// Creation Operator: timer and interval

import {timer, interval} from "rxjs";

console.log('<START');

const observer = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('Complete!')
};

// emitting values with interval of 1 second starting after 1 second
const interval$ = interval(1000);
interval$.subscribe(console.log);

// emitting values with interval of 1 second starting immediately
const timerDirect$ = timer (0, 1000)
timerDirect$.subscribe(console.log);

// emitting values with interval of 1 second starting after 2 seconds
const timerDelayed$ = timer (2000, 1000)
timerDelayed$.subscribe(console.log);

console.log('<END>');
