const { MoexApi } = require('../build')

const moexApi = new MoexApi()

;(async function () {
  const enginesMap = await moexApi.fetchEnginesMap()
  console.log('fetchEnginesMap', enginesMap)

  const securitiesMap = await moexApi.fetchSecuritiesMap()
  console.log('fetchSecuritiesMap', securitiesMap)
})()
