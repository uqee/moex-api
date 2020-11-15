const { Moex } = require('../build')

const moex = new Moex()

;(async function () {
  // const engines = await moex.engines.index()
  // console.log('engines', engines)

  // const securities = await moex.securities.index()
  // console.log('securities', securities)

  const security = await moex.securities.security()
  // console.log('security', security)
})()
