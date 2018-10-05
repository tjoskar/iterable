import { filter, reduce, some, findBest, take, skip, compose, pipe, map } from '../'

test(`Filter out string longer than 3`, () => {
  // Arrange
  const arr = ['abc', 'qwer', 'a', 'aqswde']
  const predicate = (s: string) => s.length <= 3

  // Act
  const result = Array.from(filter(predicate)(arr))

  // Assert
  expect(result).toEqual(['abc', 'a'])
})

test(`Map number to strings`, () => {
  // Arrange
  const arr = [1, 2, 3, 4]
  const fn = (n: number) => String(n)

  // Act
  const result = Array.from(map(fn)(arr))

  // Assert
  expect(result).toEqual(['1', '2', '3', '4'])
})

test(`Concat all strings`, () => {
  // Arrange
  const arr = ['abc', 'qwer', 'a', 'aqswde']
  const acc = (prev: string, curr: string) => prev + curr

  // Act
  const result = reduce(acc)(arr)

  // Assert
  expect(result).toBe('abcqweraaqswde')
})

test(`Accumulate the length of all strings`, () => {
  // Arrange
  const arr = ['abc', 'qwer', 'a', 'aqswde']
  const initValue = 0
  const acc = (prev: number, curr: string) => prev + curr.length

  // Act
  const result = reduce(acc, initValue)(arr)

  // Assert
  expect(result).toBe(14)
})

test('Check if 3 exists', () => {
  // Arrange
  const arr = [1, 5, 10, 3, 6, 8]
  const predicate = (i: number) => i === 3

  // Act
  const result = some(predicate)(arr)

  // Assert
  expect(result).toBe(true)
})

test('Check if 2 exists', () => {
  // Arrange
  const arr = [1, 5, 10, 3, 6, 8]
  const predicate = (i: number) => i === 2

  // Act
  const result = some(predicate)(arr)

  // Assert
  expect(result).toBe(false)
})

test('Stop when find a match', () => {
  // Arrange
  let i = 0
  const it = function*() {
    while (true) {
      yield i++
    }
  }
  const predicate = (i: number) => i === 2

  // Act
  const result = some(predicate)(it())

  // Assert
  expect(result).toBe(true)
  expect(i).toBe(3)
})

test('Find largest number', () => {
  // Arrange
  const arr = [1, 5, 10, 3, 6, 8]
  const predicate = (largest: number, curr: number) => largest < curr

  // Act
  const result = findBest(predicate)(arr)

  // Assert
  expect(result).toBe(10)
})

test('Only take 3 elements', () => {
  // Arrange
  const arr = [1, 5, 10, 3, 6, 8]

  // Act
  const result = Array.from(take(3)(arr))

  // Assert
  expect(result).toEqual([1, 5, 10])
})

test('Skip 3 elements', () => {
  // Arrange
  const arr = [1, 5, 10, 3, 6, 8]

  // Act
  const result = Array.from(skip(3)(arr))

  // Assert
  expect(result).toEqual([3, 6, 8])
})

test('Compose functions', () => {
  // Arrange
  const f1 = (a: number) => a.toString()
  const f2 = (a: string) => a + 1

  // Act
  const result = compose(
    f2,
    f1
  )(1)

  // Assert
  expect(result).toBe('11')
})

test('Pipe functions', () => {
  // Arrange
  const f1 = (a: number) => a.toString()
  const f2 = (a: string) => a + 1

  // Act
  const result = pipe(
    f2,
    f1
  )(1)

  // Assert
  expect(result).toBe('2')
})
