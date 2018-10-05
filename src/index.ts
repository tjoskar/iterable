export function filter<T>(predicate: (el: T) => boolean) {
  return function*(arr: IterableIterator<T> | T[]) {
    for (let el of arr) {
      if (predicate(el)) {
        yield el
      }
    }
  }
}

export function reduce<T>(acc: (prev: T, curr: T, index: number) => T): (arr: IterableIterator<T> | T[]) => T
export function reduce<T>(acc: (prev: T, curr: T, index: number) => T, init: T): (arr: IterableIterator<T> | T[]) => T
export function reduce<T, R>(acc: (prev: R, curr: T, index: number) => R, init: R): (arr: IterableIterator<T> | T[]) => R
export function reduce<T, R>(acc: (prev: R, curr: T, index: number) => R, init?: R) {
  return function(arr: IterableIterator<T> | T[]): R {
    let prev = init as R
    let i = 0
    for (let el of arr) {
      if (i === 0 && prev === undefined) {
        prev = el as any
        i = i + 1
        continue
      }
      prev = acc(prev, el, i)
      i = i + 1
    }
    return prev
  }
}

export function some<T>(predicate: (el: T) => boolean) {
  return function(arr: IterableIterator<T> | T[]): boolean {
    const { done } = filter(predicate)(arr).next()
    return !done
  }
}

export function findBest<T>(predicate: (prev: T, curr: T, index: number) => boolean) {
  return reduce<T>((prev, curr, index) => (predicate(prev, curr, index) ? curr : prev))
}

export function take(n: number) {
  return function*<T>(arr: IterableIterator<T> | T[]) {
    let i = 0
    for (let el of arr) {
      if (i >= n) {
        break
      }
      i = i + 1
      yield el
    }
  }
}

export function skip(n: number) {
  return function*<T>(arr: IterableIterator<T> | T[]) {
    let i = 0
    for (let el of arr) {
      i = i + 1
      if (i <= n) {
        continue
      }
      yield el
    }
  }
}

export function compose(...ops: ((a: any) => any)[]): ((startArg: any) => any) {
  return ops.reduceRight((a, b) => (arg: any) => b(a(arg)))
}

export function pipe(...ops: ((a: any) => any)[]): ((startArg: any) => any) {
  return ops.reduce((a, b) => (arg: any) => b(a(arg)))
}
