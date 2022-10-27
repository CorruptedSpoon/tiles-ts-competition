export type Monoid<T> = {
  identity: T,
  append: ((a: T, b: T) => T)
        | ((a: T) => (b: T) => T)
}