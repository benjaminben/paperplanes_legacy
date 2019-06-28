import store from "../store"

export default (dest) => {
  const theme = dest.getAttribute("data-theme")
  const color = theme === "dark" ? "white" : "black"
  const backgroundColor = dest.getAttribute("data-bg-color")
  const ops = {color, backgroundColor}
  store.dispatch("ui/dressBody", ops)
}
