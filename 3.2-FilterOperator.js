// 3.2-FilterOperator
// Ignore unneeded values with filter

import {of, fromEvent} from "rxjs";
import {map, filter} from "rxjs/operators" ;

console.log(`<START>`);

of(1, 2, 3, 4, 5).pipe(
    filter(value => value > 2)
).subscribe(console.log);

const keyup$ = fromEvent(document, 'keyup');
const keyCode$ = keyup$.pipe(
    map(event => event.code)
);
const enter$ = keyCode$.pipe(
    filter(code => code === 'Enter')
);

keyCode$.subscribe(console.log);
enter$.subscribe(console.log);

console.log(`<END>`);
