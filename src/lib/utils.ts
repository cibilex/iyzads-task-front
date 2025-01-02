const pad = (number: number) => (number < 10 ? '0' + number : number)

export const formatDate = (date: number, full = true, seconds = false) => {
  if (date === 0 || !date) {
    return '-'
  }

  const tar = new Date(date * 1000)
  let net = pad(tar.getDate())

  net += '.' + pad(tar.getMonth() + 1)
  net += '.' + pad(tar.getFullYear())

  if (full) {
    net += ' ' + pad(tar.getHours())
    net += ':' + pad(tar.getMinutes())
    if (seconds) net += ':' + pad(tar.getSeconds())
  }
  return net
}

export const getPrice = (p: number) => {
  if (isNaN(p)) return ''
  const price = Number(p / 100).toLocaleString('en-US')

  if (price.includes('.')) {
    const [int, dec] = price.split('.')
    if (dec.length == 2) return price
    else if (dec.length == 1) return price + '0'
    else if (dec.length > 2) return int + '.' + dec.substring(0, 2)
  }
  return price + '.00'
}
