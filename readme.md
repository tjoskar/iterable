# iterable [![Build Status](https://travis-ci.org/tjoskar/iterable.svg?branch=master)](https://travis-ci.org/tjoskar/iterable) [![codecov](https://codecov.io/gh/tjoskar/iterable/branch/master/graph/badge.svg)](https://codecov.io/gh/tjoskar/iterable)

> Iterate your data


## Install

```
$ npm install @tjoskar/iterable
```

## Example

```js
import { filter, map, pipe } from '@tjoskar/iterable'

const myLargeArray = [ 1, 2, 3, 4, 5, 6, ... ]

const myTransformedArray = pipe(
  map(n => n ** 2),
  filter(n => n % 2 === 0)
)(myLargeArray)

for (let n of myTransformedArray) {
  console.log(n) // 4, 16, 36
  if (n > 16) {
    break
  }
}
```

## Usage

### filter

```js
const myIterableIterator = [ 1, 2, 3 ]

const result = filter(i => i < 3)(myIterableIterator)

for (let i of result) {
  console.log(i) // 1, 2
}
```

```js
function* myIterableIterator() {
  let i = 0
  while(true) {
    yield i++
  }
}

const result = filter(i => i < 10)(myIterableIterator)

for (let i of result) {
  if (i === 5) {
    break
  }
  console.log(i) // 0, 1, 2, 3, 4
}
```

### map

```js
function* myIterableIterator() {
  let i = 0
  while(true) {
    yield i++
  }
}

const result = map(i => i * i)(myIterableIterator)

for (let i of result) {
  if (i === 5) {
    break
  }
  console.log(i) // 0, 1, 4, 9, 16
}
```

### reduce

```js
function* myIterableIterator() {
  const arr = [ 1, 2, 3, 4 ]
  let i = 0
  while(true) {
    yield arr[i++]
  }
}

const result = reduce((p, c) => p + c)(myIterableIterator)

console.log(result) // 10
```

```js
function* myIterableIterator() {
  const arr = ['abc', 'qwer', 'a', 'aqswde']
  let i = 0
  while(true) {
    yield arr[i++]
  }
}

const result = reduce((p, c) => p + c.length, 0)(myIterableIterator)

console.log(result) // 14
```

### some

```js
function* myIterableIterator() {
  const arr = [ 1, 2, 3, 4 ]
  let i = 0
  while(true) {
    yield arr[i++]
  }
}

const result = some(v => v === 2)(myIterableIterator)

console.log(result) // true (will stop after 2 iterations)
```

### findBest

```js
const myIterableIterator = [ 1, 10, 3, 4 ]

const result = findBest((largest, curr) => largest < curr)(myIterableIterator)

console.log(result) // 10
```

### take

```js
const myIterableIterator = [ 1, 10, 3, 4 ]

const result = take(2) // IterableIterator with two elements (1, 10)

console.log(Array.from(result)) // [ 1, 10 ]
```

### skip

```js
const myIterableIterator = [ 1, 10, 3, 4, 5 ]

const result = skip(2) // IterableIterator with three elements (3, 4, 5)

console.log(Array.from(result)) // [ 3, 4, 5 ]
```

## License

MIT
