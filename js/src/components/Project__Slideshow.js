import Vue from "vue"

export default (root) => {
  return new Vue({
    el: root,
    data: {
      active: 0,
    },
    methods: {
      navPrev: function() {
        var dest = this.active - 1
        if (dest < 0) { dest = this.$refs.items.childElementCount - 1 }
        this.active = dest
      },
      navNext: function() {
        var dest = this.active + 1
        if (dest >= this.$refs.items.childElementCount) { dest = 0 }
        this.active = dest
      },
    },
  })
}
