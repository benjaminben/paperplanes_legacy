import Vue        from "Vue"
import Vuex       from "Vuex"
import Loader     from "./components/Loader"
import Navigation from "./components/Navigation"
import Home       from "./components/Home"
import Team       from "./components/Team"

Loader("#loader")
// Home("#content.home")
Team("#content.team")
Navigation("#site-navigation")
