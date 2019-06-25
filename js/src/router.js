import barba                 from "@barba/core"
import Loader                from "./components/Loader"
import Navigation            from "./components/Navigation"
import Home                  from "./components/Home"
import Team                  from "./components/Team"
import Work                  from "./components/Work"
import About                 from "./components/About"
import Contact               from "./components/Contact"
import Project               from "./components/Project"
import Project__Slideshow    from "./components/Project__Slideshow"
import Project__Gallery      from "./components/Project__Gallery"
import Project__MarqueeVideo from "./components/Project__MarqueeVideo"
import Play                  from "./components/Play"
import {siteUrl}             from "./config"
import store                 from "./store"
import {
  TimelineMax,
  TweenLite,
} from "gsap"

const ComponentMap = {
  Loader,
  Navigation,
  Home,
  Team,
  About,
  Work,
  Project,
  Project__Slideshow,
  Project__Gallery,
  Project__MarqueeVideo,
  Contact,
  Play,
}

vueify(document.body)

barba.init({
  debug: true,
  transitions: [
    {
      name: "menu-transition",
      from: {
        custom: ({current, next, trigger}) => {
          return trigger.className.match("menu-link")
        },
      },
      to: {},
      beforeEnter: ({current, next, trigger}) => {
        const nextTheme = next.container.getAttribute("data-theme") === "dark" ? 1 : 0
        store.dispatch("ui/setTheme", nextTheme)
        store.dispatch("nav/setEscape", null)
        store.dispatch("nav/setSlug", null)
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
        vueify(next.container)
      }
    },
    {
      name: "project-exit-transition",
      from: "project",
      to: {
        namespace: ["work"]
      },
      beforeEnter: ({current, next, trigger}) => {
        vueify(next.container)
        store.dispatch("nav/setEscape", null)
        store.dispatch("ui/lockScroll")
        const wipe = next.container.querySelector("#pageWipe")
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
      from: {},
      to: {},
      beforeEnter: ({current, next, trigger}) => {
        const nextTheme = next.container.getAttribute("data-theme") === "dark" ? 1 : 0
        store.dispatch("ui/setTheme", nextTheme)
        store.dispatch("ui/scrollPosition", [0,0])
        store.dispatch("nav/setEscape", null)
        store.dispatch("nav/setSlug", null)
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

// barba.hooks.beforeEnter()

barba.hooks.afterEnter(({current, next, trigger}) => {
  store.dispatch("nav/setSlug", trigger.getAttribute("data-dest"))
})

function vueify(root) {
  if (root.getAttribute("data-vue-root")) {mapComponentToNode(root)}
  root.querySelectorAll("*[data-vue-root]").forEach(mapComponentToNode)
}

function mapComponentToNode(n) {
  const component = ComponentMap[n.getAttribute("data-vue-root")]
  return component(n)
}
