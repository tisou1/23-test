const pathToRegexp = require('path-to-regexp')

const keys = []
// console.log(pathToRegexp)
const re = pathToRegexp.pathToRegexp('/foo/:bar(hjk|sdh)', keys)
console.log(re.test('/foo/sdh'))
// console.log(keys)
