export default (...fns) =>
  (arg) =>
    fns.reduce((acc, fn) => acc.then(fn), Promise.resolve(arg))
