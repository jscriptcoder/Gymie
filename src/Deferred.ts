/**
 * `resolved()` method
 */
type PromiseResolve<T> = (value?: T) => void

/**
 * `reject()` method
 */
type PromiseReject = (reason?: any) => void

/**
 * Returns an object with a promise on the way and two methods, 
 * `resolve()` and `reject()`, to change its state.
 * @see {@link https://mzl.la/34i6vXn Deferred object}
 * @typeParam T Data wrapped in the promise.
 */
export default class Deferred<T> {
  
  /**
   * Changes the state of the promise to `resolved`
   * @see {@link https://mzl.la/3johZwY Promise.resolve()}
   */
  resolve: PromiseResolve<T> = null

  /**
   * Changes the state of the promise to `rejected`
   * @see {@link https://mzl.la/2TbqLDw Promise.reject()}
   */
  reject: PromiseReject = null
  promise: Promise<T> = null

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}
