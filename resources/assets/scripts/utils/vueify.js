import Loader                from "../components/Loader"
import Navigation            from "../components/Navigation"
import Home                  from "../components/Home"
import Team                  from "../components/Team"
import Work                  from "../components/Work"
import About                 from "../components/About"
import Contact               from "../components/Contact"
import Project               from "../components/Project"
import Project__Slideshow    from "../components/Project__Slideshow"
import Project__Gallery      from "../components/Project__Gallery"
import Project__MarqueeVideo from "../components/Project__MarqueeVideo"
import Play                  from "../components/Play"

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

function vueify(root) {
  if (root.getAttribute("data-vue-root")) {mapComponentToNode(root)}
  Array.from(root.querySelectorAll("*[data-vue-root]")).forEach(mapComponentToNode)
}

function mapComponentToNode(n) {
  const component = ComponentMap[n.getAttribute("data-vue-root")]
  return component(n)
}

export default vueify
