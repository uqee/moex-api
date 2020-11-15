const { Moex } = require('../build')

const moex = new Moex()

;(async function () {
  const engines = await moex.getEngines()
  // console.log('engines', engines)

  const securities = await moex.getSecurities()
  // console.log('securities', securities)

  const security = await moex.getSecuritiesSecurity({ security: 'IMOEX' })
  // console.log('security', security)
})()
