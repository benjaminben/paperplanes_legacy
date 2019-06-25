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
import store                 from "./store"

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
  transitions: [
    {
      name: "menu-transition",
      from: {},
      to: {},
      custom: ({current, next, trigger}) => {
        return trigger.className.match("menu-link")
      },
      afterLeave() {
        store.dispatch("ui/setScrollPosition", [0,0])
        store.dispatch("nav/setNavClosed")
        store.dispatch("ui/unlockScroll")
      },
    },
    {
      name: "project-exit-transition",
      from: "project",
      to: {
        namespace: [
          "work"
        ]
      },
      beforeEnter() {
        // store.dispatch("ui/setTheme", 1)
        console.log("suppppp")
        store.dispatch("ui/setEscape", null)
      }
    },
    {
      name: "project-enter-transition",
      from: {},
      to: {
        namespace: [
          "project"
        ]
      },
    },
    {
      name: "default-transition",
      from: {},
      to: {},
      beforeEnter() {
        store.dispatch("ui/scrollPosition", [0,0])
        store.dispatch("nav/setEscape", null)
        store.dispatch("nav/setSlug", null)
      }
    },
  ]
})

barba.hooks.before(data => {
  console.log("SIP", data)
})

barba.hooks.beforeEnter(({current, next, trigger}) => {
  const nextTheme = next.container.getAttribute("data-theme") === "dark" ? 1 : 0
  store.dispatch("ui/setTheme", nextTheme)
  vueify(next.container)
  return
})

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
