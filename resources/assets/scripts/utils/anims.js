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
  var rootDims = root.getBoundingClientRect()
  var anims = Array.from(root.querySelectorAll(`${animQuery}`))
  var inits = anims.filter(n => {
    const {top, bottom} = n.getBoundingClientRect()
    return bottom > 0 && top < window.innerHeight
  })

  store.dispatch("ui/registerObserver", { // Set delays
    nodes: inits,
    options: { rootMargin: "0px", threshold: 0.1 },
    callback: (entries, observer) => {
      let delay = 0
      const tops = uniq(entries.map(e => {
        let offsetTop  = 0
        let el = e.target
        do{
            offsetTop  += el.offsetTop
            el = el.offsetParent;
        } while( el )
        e._qt = offsetTop

        // const n = e.target
        // const {top: t, height} = n.getBoundingClientRect()
        // const trans = window.getComputedStyle(n).transform
        // let mult = 1
        // try {
        //   let s = trans.match(/[0-9., -]+/)[0].split(", ")[0]
        //   mult = parseFloat(s)
        // } catch(e) { /* shhhh... */ }
        // console.log(t - (0.5 * (height - height*mult)))
        // e._qt = t + (0.5 * (height - height*mult))

        return e._qt
      })).sort((a,b) => a > b)
      const ct = 0
      const prevTop = 0
      entries.forEach((e,i) => {
        const delay = 0.5 * tops.indexOf(e._qt)
        e.target.style.transitionDelay = `${delay}s`
      })
      entries.forEach(e => observer.unobserve(e.target))


      // Dispatch main loop in callback (race condition?)
      store.dispatch("ui/registerObserver", {
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
  })
}

export {
  initAnims
}
