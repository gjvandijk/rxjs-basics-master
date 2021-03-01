// 5.2 Lab01-Scrollbar with throttleTime

import './styles.css';

console.clear();

// begin lesson code
import {asyncScheduler, fromEvent} from 'rxjs';
import {map, tap, throttleTime} from 'rxjs/operators';

// helpers
function calculateScrollPercent(element) {
    // get properties of element using object destructuring
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = element;
    return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

const progressBar = document.querySelector('.progress-bar')


console.log(`<START>`);
// create stream of scroll events
const scroll$ = fromEvent(document, 'scroll');

// create stream of percentages scrolled
const progress$ = scroll$.pipe(
    // limit emissions leads to incorrect scroll position because the last value
    // did not emit.
    // change the default behavior to take the last value and not the first value
    // using configuration object asyncScheduler
    throttleTime(200, asyncScheduler, {
        leading: false, // default true
        trailing: true, // default false
    }),
    map(({target}) => {
            return calculateScrollPercent(target.documentElement);
        }
    ),
    tap(console.log),
);

progress$.subscribe(percent => {
    progressBar.style.width = `${percent}%`
});

console.log(`<END>`);
