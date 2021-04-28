class Parser {
  constructor (content) {
    this.lines = content.split('\r\n')
  }
  
  parse () {
    throw new Error('Not implement!')
  }
}

module.exports = Parser
