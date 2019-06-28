import { animQuery } from "../config"
import store         from "../store"

function uniq(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
}

function initAnims(root) {
  var anims = Array.from(root.querySelectorAll(`${animQuery}`))

  store.dispatch("ui/registerObserver", { // Set delays
    nodes: anims,
    options: { rootMargin: "0px", threshold: 0.1 },
    callback: (entries, observer) => {
      let delay = 0
      // const tops = uniq(entries.map(e => e.boundingClientRect.top)).sort((a,b) => a < b)
      // const ct = 0
      // const prevTop = 0
      entries.forEach((e,i) => {
        if (e.isIntersecting) {
          // if (!e.target.className.match("anim-match-delay")) {
          //   ct += 1
          //   prevTop = e.boundingClientRect.top
          // }
          const delay = 0.5 * i
          e.target.style.transitionDelay = `${delay}s`
        }
      })
      entries.forEach(e => observer.unobserve(e.target))
    }
  })

  store.dispatch("ui/registerObserver", { // Main loop
    nodes: anims,
    options: { rootMargin: "0px", threshold: 0.1, },
    callback: (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.className += " anim-active"
          observer.unobserve(entry.target)
        }
      })
    }
  })
}

export {
  initAnims
}
