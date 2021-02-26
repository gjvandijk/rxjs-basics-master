// 3.3-Lab01-Scrollbar

import './styles.css';

console.clear();

// begin lesson code
import {fromEvent} from 'rxjs';
import {map} from 'rxjs/operators';

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
    map(({target}) => {
            return calculateScrollPercent(target.documentElement);
        }
    ));

progress$.subscribe(percent => {
    progressBar.style.width = `${percent}%`
});

console.log(`<END>`);
