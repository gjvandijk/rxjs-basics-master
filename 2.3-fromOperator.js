// 2.3 from operator
// Creation Operator: from
// from (array, string, promise, iterator)
//    Turn Arrays, iterators and promises into observables using from
// Values are emitted synchonously upon subscription

import {of, from, range} from "rxjs";

// iterator function (* is required)
function* hello() {
    yield 'hello';
    yield 'world';
}
// create iterator:
const iterator = hello();
console.log('fromIterator', iterator.next().value);
console.log('fromIterator', iterator.next().value);
console.log('fromIterator', iterator.next().value);

console.log('<START');

const observer = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('Complete!')
};
const array = [1,2,3,4,5]
console.log('of(array) => Returns whole array as single value)');
const ofArray$ = of(array);
ofArray$.subscribe(observer);

console.log('from(array) => Returns individual array values')
const fromArray$ = from(array);
fromArray$.subscribe(observer);

console.log('from(string) => returns individual characters of string')
const fromString$ = from('Hello');
fromString$.subscribe(observer);

console.log('from(promise) => returns results from promise')
const fromPromise$ = from(fetch('https://api/github.com/users/octocat'));
fromPromise$.subscribe(observer);

console.log('from(iterator) => returns individual values from iterator function')
const fromIterator$ = from(hello());
fromIterator$.subscribe(observer);

console.log('<END>');
