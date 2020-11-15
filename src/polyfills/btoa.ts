if (typeof btoa === 'undefined') {
  global.btoa = (string: string): string => {
    return Buffer.from(string).toString('base64')
  }
}
