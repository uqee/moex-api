const { Moex } = require('../build')

const moex = new Moex()

;(async function () {
  const enginesMap = await moex.engines.index()
  // console.log('engines', enginesMap)

  const securitiesMap = await moex.securities.index()
  // console.log('securities', securitiesMap)
})()
