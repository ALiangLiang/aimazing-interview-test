const escapeRegExp = require('lodash/escapeRegExp')

function findLinesUntil (lines, until=null) {
  if (until === null)
    return lines.splice(0, lines.length)

  if (!(until instanceof RegExp))
    until = new RegExp(`^${escapeRegExp(until)}$`)

  for (let lineNum in lines) {
    const line = lines[lineNum]
    if (line.match(until)) {
      const result = lines.splice(0, lineNum)
      lines.shift() // Remove matched line from lines
      return result
    }
  }
}

function removeEmptyEle (arr) {
  return arr.filter((ele) => ele != null)
}

module.exports = {
  findLinesUntil: findLinesUntil,
  removeEmptyEle: removeEmptyEle,
}
