import barba      from "@barba/core"
import Loader     from "./components/Loader"
import Navigation from "./components/Navigation"
import Home       from "./components/Home"
import Team       from "./components/Team"

const ComponentMap = {
  Loader,
  Navigation,
  Home,
  Team,
}

vueify(document.body)

barba.init({
  transitions: [
    {
      name: "default-transition",
      from: {},
      to: {},
    },
  ]
})

function vueify(root) {
  root.querySelectorAll("*[data-vue-root]").forEach(n => {
    const component = ComponentMap[n.getAttribute("data-vue-root")]
    return component(n)
  })
}
