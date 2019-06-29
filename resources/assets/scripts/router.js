import barba                 from "@barba/core"
import { siteUrl }           from "./config"
import { initAnims }         from "./utils/anims"
import vueify                from "./utils/vueify"
import dressUp               from "./utils/dressUp"
import store                 from "./store"
import {
  TimelineMax,
  TweenLite,
} from "gsap"

vueify(document.body)
dressUp(document.getElementById("content"))

barba.use(barba.logger)

barba.init({
  debug: process.env.NODE_ENV === "production" ? false : true,
  transitions: [
    {
      name: "menu-transition",
      from: {
        custom: ({current, next, trigger}) => trigger.className && trigger.className.match("menu-link"),
      },
      to: {},
      beforeEnter: ({current, next, trigger}) => {
        const nextTheme = next.container.getAttribute("data-theme") === "dark" ? 1 : 0
        store.dispatch("ui/setTheme", nextTheme)
        store.dispatch("nav/setEscape", null)
        vueify(next.container)
        return
      },
      afterLeave: () => {
        store.dispatch("ui/setScrollPosition", [0,0])
        store.dispatch("ui/unlockScroll")
      },
      after: () => {
        store.dispatch("nav/setNavClosed")
      }
    },
    {
      name: "project-enter-transition",
      from: {},
      to: {
        namespace: ["project"]
      },
      before: ({current, next, trigger}) => {
        store.dispatch("ui/setTheme", 1)
        store.dispatch("nav/setEscape", siteUrl + "/work")
        next.container.style.visibility = "visible"
        next.container.style.display = "none"
        var wipe = current.container.querySelector("#pageWipe")
        wipe.style.transform = "translateY(0)"
        return new Promise((rs, rj) => {
          window.setTimeout(() => {
            store.dispatch("work/setScroll", [window.scrollX, window.scrollY])
            window.scrollTo(0,0)
            document.body.style.backgroundColor = "rgba(0,0,0,1)"
            current.container.style.display = "none"
            next.container.style.display = "block"
            rs()
          }, 500)
        })
      },
      beforeEnter: ({current, next, dest}) => {
        console.log("hello hello hello", next)
        vueify(next.container)
      },
    },
    {
      name: "project-exit-transition",
      from: "project",
      to: {
        namespace: ["work"],
      },
      beforeEnter: ({current, next, trigger}) => {
        console.log("boop to work")
        vueify(next.container)
        store.dispatch("nav/setEscape", null)
        store.dispatch("ui/lockScroll")
        store.dispatch("ui/setTrans", true)
        current.container.style.animation = "none"

        current.container.style.zIndex = 1

        return new Promise(resolve => {
          TweenLite.to(current.container, 0.4, {
            opacity: 0,
            onComplete: () => {
              current.container.style.display = "none"
              next.container.style.position = "relative"
              store.dispatch("ui/setTheme", 0)
              store.dispatch("ui/setTrans", false)
              store.dispatch("ui/unlockScroll")
              window.scrollTo(
                store.state.work.scroll[0],
                store.state.work.scroll[1]
              )
              resolve()
            }
          })
        })
      },
    },
    {
      name: "default-transition",
      from: {
        custom: ({next, trigger}) => trigger === "popstate" || !next.namespace,
      },
      to: {},
      beforeEnter: ({current, next, trigger}) => {
        const nextTheme = next.container.getAttribute("data-theme") === "dark" ? 1 : 0
        store.dispatch("ui/setTheme", nextTheme)
        store.dispatch("ui/setScrollPosition", [0,0])
        store.dispatch("nav/setEscape", null)
        store.dispatch("nav/setSlug", null)
        store.dispatch("ui/setTrans", false)
        vueify(next.container)
        return
      },
      afterLeave() {
        store.dispatch("ui/setScrollPosition", [0,0])
        store.dispatch("nav/setNavClosed")
        store.dispatch("ui/unlockScroll")
      },
    },
    {
      name: "home-transition",
      from: {
        custom: ({next}) => next.namespace === "home"
      },
      to: {},
      beforeEnter: ({current, next, trigger}) => {
        const nextTheme = next.container.getAttribute("data-theme") === "dark" ? 1 : 0
        store.dispatch("ui/setTheme", nextTheme)
        store.dispatch("ui/setScrollPosition", [0,0])
        store.dispatch("nav/setEscape", null)
        store.dispatch("nav/setSlug", null)
        store.dispatch("ui/setTrans", false)
        vueify(next.container)
        return
      },
      afterLeave() {
        store.dispatch("ui/setScrollPosition", [0,0])
        store.dispatch("nav/setNavClosed")
        store.dispatch("ui/unlockScroll")
      },
    },
  ]
})

barba.hooks.before(({current, next, trigger}) => {
  console.log("bootybootybooty", current, next, trigger)
  if (trigger === "popstate") {}
})

barba.hooks.beforeEnter(({current, next, trigger}) => {
  dressUp(next.container)
})

barba.hooks.afterEnter(({current, next, trigger}) => {
  store.dispatch("nav/setSlug", next.namespace)
})

barba.hooks.after(({next}) => {
  window.setTimeout(() => initAnims(document.body), 500) // :|
})

const routerEvent_leave = new Event("_routerEvent_leave")

barba.hooks.leave(data => {
  window.dispatchEvent(routerEvent_leave)
})
