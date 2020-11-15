const { Moex } = require('../build')

const moex = new Moex()

;(async function () {
  const enginesMap = await moex.engines.fetchEnginesMap()
  console.log('fetchEnginesMap', enginesMap)

  const securitiesMap = await moex.securities.fetchSecuritiesMap()
  console.log('fetchSecuritiesMap', securitiesMap)
})()
