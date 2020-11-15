// URLSearchParams
// https://github.com/WebReflection/url-search-params#ios-10--other-platforms-bug

try {
  if (new URLSearchParams('q=%2B').get('q') !== '+') {
    throw new Error()
  }
} catch (error) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  ;(window as any).URLSearchParams = undefined
  require('@ungap/url-search-params')
}
