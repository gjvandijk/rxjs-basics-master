// 3.1-TransformationOperators
// Pipeable Transformation (projection) Operator: map, pluck and mapTo

import {of, fromEvent} from "rxjs";
import {map, pluck, mapTo} from "rxjs/operators";

console.log('<START');

// const observer = {
//     next: val => console.log('next', val),
//     error: err => console.log('error', err),
//     complete: () => console.log('Complete!')
// };
const keyup$ = fromEvent(document, 'keyup');

// map: transform emitted value
const mapCode$ = keyup$.pipe(
    map(event => event.code)
);

// pluck: get single property from emitted value
const pluckCode$ = keyup$.pipe(
    pluck('code')
);

// note: pluck also can select nested properties
const pluckTargetNodeName$ = keyup$.pipe(
    pluck('target', 'nodeName')
);

const pressed$ = keyup$.pipe(
    mapTo('Key Pressed')
);

// map emitted value to a Constant value


keyup$.subscribe(console.log);
mapCode$.subscribe(console.log);
pluckCode$.subscribe(console.log);
pluckTargetNodeName$.subscribe(console.log);
pressed$.subscribe(console.log);

console.log('<END>');
