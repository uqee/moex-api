const { Moex } = require('../build')

const moex = new Moex()

;(async function () {
  console.log(await moex.getEngines())
  console.log(await moex.getSecurities())
  console.log(await moex.getSecuritiesSecurity({ security: 'IMOEX' }))
})()
