const Parser = require('./parser')
const { findLinesUntil } = require('../helpers')

class Parser1 extends Parser {
  constructor (content) {
    super(content)
  }
  
  parse () {
    this.parseSections()

    return Object.assign(
      this.parseHeaderSection(),
      this.parseProductsSection(),
      this.parseSummarySection(),
      this.parseTotalSection(),
    )
    
  }
  
  parseSections () {
    this.headerSection = findLinesUntil(this.lines, '+----------------------------------------------+')
    this.productsSection = findLinesUntil(this.lines, '')
    this.summarySection = findLinesUntil(this.lines, '------------------------')
    this.totalSection = findLinesUntil(this.lines, '------------------------')
    this.gstValueSection = findLinesUntil(this.lines, /Thank You/)
  }

  parseDateTimeLine (line) {
    const [dateStr, timeStr] = line.split('  ')
    const [day, month, year] = dateStr.replace('Date:', '').split('.')
    const [hour, min, sec] = timeStr.replace('Time:', '').split(':')
    return new Date(year, month, day, hour, min, sec)
  }
  
  parseHeaderSection () {
    return {
      storeName: this.headerSection[0],
      tel: this.headerSection[1].replace('Tel :', ''),
      gstRegNo: this.headerSection[2].replace('GST Reg.:', ''),
      idOnReceipt: Number(this.headerSection[5].replace('Receipt ID:', '')),
      tradeTime: this.parseDateTimeLine(this.headerSection[4]),
    }
  }
  
  parseProductsSection () {
    const productsData = []

    for (let i = 0; i < this.productsSection.length; i += 2) {
      let [ean, ...name] = this.productsSection[i].split(' ')
      name = name.join(' ')
      const line2 = this.productsSection[i + 1].split(/ +/)
      productsData.push({
        ean: ean,
        name: name,
        quantity: Number(line2[0]),
        unitPrice: Number(line2[2]),
      })
    }
    
    return {
      products: productsData
    }
  }
  
  parseSummarySection () {
    const splitedLines =  this.summarySection.map((line) => line.split(/ +/))

    let tender = null
    let change = null
    if (splitedLines[1][0] === 'TENDER') {
      tender = Number(splitedLines[1][1])
      change = Number(splitedLines[1][3])
    }

    return {
      payWay: splitedLines[0][0],
      subTotal: Number(splitedLines[0][2]),
      tender: tender,
      change: change,
    }
  }
  
  parseTotalSection () {
    return {
      total: Number(this.totalSection[0].split(/ +/)[2])
    }
  }
}

module.exports = Parser1