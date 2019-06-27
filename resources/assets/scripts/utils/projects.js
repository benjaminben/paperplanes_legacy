function masonrifyGallery(root) {
  const compDistances = [0, 0]
  const items = Array.from(root.querySelectorAll(".item"))
  const em = parseFloat(getComputedStyle(root).fontSize)

  Promise.resolve().then(() => items.forEach(p => {
    p.style.transform = `translateY(0px)`
  })).then(() => {
    items.forEach((p,i,a) => {
      if (i < 2) { return }
      const currImg = p.children[0]
      const prevImg = a[i-2].children[0]
      const {top: currTop} = p.getBoundingClientRect()
      const prevBottom = a[i-2].getBoundingClientRect().top + prevImg.clientHeight
      const distance = currTop - prevBottom
      compDistances[i%2] += distance
      p.style.transform = `translateY(${-1 * (distance - em)}px)`
    })
  })
}

export {
  masonrifyGallery
}
