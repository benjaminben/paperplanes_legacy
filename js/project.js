(function() {
  var doc = document.documentElement
  var siteUrl = document.body.getAttribute("data-site-url")
  var marquees =
  Array.from(document.querySelectorAll(".layout.marquee-video"))
    .map(function(l,i,a) {
      return new Vue({
        el: l,
        data: {
          player: null,
          played: false,
          cover: true,
        },
        watch: {
          played: function(val, oldVal) {
            if (val && !oldVal) {
              this.cover = false
            }
          },
        },
        mounted: function() {
          doc._actions.ui.setTheme(1) // Go dark
          doc._actions.nav.setTheme(1)
          doc._actions.nav.setEscape(siteUrl + "/work")
          this.player = new Vimeo.Player("vimeo_" + l.querySelector(".embed").getAttribute("data-vimeo-id"))
          var playBtn = l.querySelector(".ctrl .play")
          // console.log(playBtn)
          // playBtn.addEventListener("click", function() {
          //   console.log("play")
          // })
          this.player.on("play", function() {
            console.log("blug")
          })
        },
        methods: {
          handlePlay: function(e) {
            var _this = this
            _this.player.play()
            TweenLite.to(_this.$refs.cover, 0.2, {
              opacity: 0,
              scale: 1.1,
              onComplete: function() {
                _this.played = true
              }
            })
          }
        },
      })
    })

  var slideshows =
  Array.from(document.querySelectorAll(".layout.slideshow"))
    .map(function(l,i,a) {
      return new Vue({
        el: l,
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
    })

  initPhotoSwipeFromDOM(".layout.gallery")
  // var galleries =
  // Array.from(document.querySelectorAll(".layout.gallery"))
  //   .map(function(g,i,a) {
  //     return new Vue({
  //       el: g,
  //       data: {},
  //       methods: {},
  //       mounted: function() {
  //         initPhotoSwipeFromDOM()
  //       },
  //     })
  //   })
})()

/****************PHOTOSWIPE*********************/
/****************PHOTOSWIPE*********************/
/*********** https://photoswipe.com ************/
function initPhotoSwipeFromDOM(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            itemEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            itemEl = thumbElements[i]; // .item element

            // include only element nodes
            if(itemEl.nodeType !== 1) {
                continue;
            }

            imgEl = itemEl.children[0]; // <img> element

            // create slide object
            item = {
                src: imgEl.getAttribute('src'),
                msrc: imgEl.getAttribute('data-thumb-src'),
                w: parseInt(imgEl.getAttribute('width'), 10),
                h: parseInt(imgEl.getAttribute('height'), 10)
            };

            var cap = itemEl.querySelector('.caption')
            if (cap) { item.title = cap.innerHTML }

            item.el = itemEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.currentTarget;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.className.match(/item/));
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) {
                continue;
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if(pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        console.log("open sesame", galleryElement)
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        console.log(galleryElements[i])
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].children[0].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};
