import {fromEvent, interval} from "rxjs";
import {debounce, debounceTime, distinctUntilChanged, pluck, tap} from "rxjs/operators";
import './styles.css';
console.log('<START>');

// ==================================================================
// Simple example debounceTime
// ==================================================================
const click$ = fromEvent(document, 'click');

click$.pipe(
    debounceTime(1000)
).subscribe(console.log);

// ==================================================================
// Example text input with debounceTime (fixed duration)
// ==================================================================
const inputBox = document.getElementById('text-input');
const input$ = fromEvent(inputBox, 'keyup');

input$.pipe(
    tap(console.log),
    debounceTime(1000),
    pluck( 'target', 'value'), // get value of property target.value
    distinctUntilChanged(),
).subscribe(console.log);

// ==================================================================
// Example text input with debounce (duration provided by function)
// ==================================================================
input$.pipe(
    tap(console.log),
    debounce( () => interval(1000)),
    pluck( 'target', 'value'), // get value of property target.value
    distinctUntilChanged(),
).subscribe(console.log);



console.log('<END>');
