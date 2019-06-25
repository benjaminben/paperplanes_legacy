const debug = false
const siteUrl = document.body.getAttribute("data-site-url")
const animQuery = "*[class^=anim-]:not(.anim-active), *[class*= anim-]:not(.anim-active)"

export {
  animQuery,
  siteUrl,
  debug,
}
