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
