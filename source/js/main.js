// welcome
;(() => {
  console.log(
    `\n %c Hexo theme Stellaris %c ${stellar.github} %c \n \n`,
    'color: #eff4f9; background: #030307; padding: 5px; border-radius: 4px 0 0 4px;',
    'background: #eff4f9; padding: 5px; border-radius: 0 4px 4px 0;',
    ''
  )
  console.log('By Kirikaze Chiyuki')
})()

// utils
const util = {
  // https://github.com/jerryc127/hexo-theme-butterfly
  diffDate: (d, more = false) => {
    const dateNow = new Date()
    const datePost = new Date(d)
    const dateDiff = dateNow.getTime() - datePost.getTime()
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24
    const month = day * 30

    let result
    if (more) {
      const monthCount = dateDiff / month
      const dayCount = dateDiff / day
      const hourCount = dateDiff / hour
      const minuteCount = dateDiff / minute

      if (monthCount > 12) {
        result = null
      } else if (monthCount >= 1) {
        result = parseInt(monthCount) + ' ' + stellar.config.date_suffix.month
      } else if (dayCount >= 1) {
        result = parseInt(dayCount) + ' ' + stellar.config.date_suffix.day
      } else if (hourCount >= 1) {
        result = parseInt(hourCount) + ' ' + stellar.config.date_suffix.hour
      } else if (minuteCount >= 1) {
        result = parseInt(minuteCount) + ' ' + stellar.config.date_suffix.min
      } else {
        result = stellar.config.date_suffix.just
      }
    } else {
      result = parseInt(dateDiff / day)
    }
    return result
  },

  copy: (id, msg) => {
    const el = document.getElementById(id)
    if (el) {
      el.select()
      document.execCommand('Copy')
      if (msg && msg.length > 0) {
        hud.toast(msg)
      }
    }
  },

  toggle: (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.classList.toggle('display')
    }
  },
}

const hud = {
  toast: (msg, duration) => {
    duration = isNaN(duration) ? 2000 : duration
    const el = document.createElement('div')
    el.classList.add('toast')
    el.innerHTML = msg
    document.body.appendChild(el)
    setTimeout(function () {
      const d = 0.5
      el.style.webkitTransition =
        '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in'
      el.style.opacity = '0'
      setTimeout(function () {
        document.body.removeChild(el)
      }, d * 1000)
    }, duration)
  },
}

const sidebar = {
  toggle: () => {
    const l_body = document.querySelector('.l_body')
    if (l_body) {
      l_body.classList.add('mobile')
      l_body.classList.toggle('sidebar')
    }
  },
}

const stellaris = {
  themePlugins: {},
  registerThemePlugin: function (selector, plugin) {
    this.themePlugins[selector] = plugin
    this.onDocReady(() => plugin.init())
  },
  pluginsConfig: {
    fancyBoxSelector: '',
  },
  onDocReady(fn) {
    if (document.readyState !== 'loading') {
      fn()
    } else {
      document.addEventListener('DOMContentLoaded', fn)
    }
  },
  loadCSS: {
    fancyBox: () => {
      if (stellar.plugins.fancybox)
        stellar.loadCSS(stellar.plugins.fancybox.css)
    },
    swiper: () => {
      if (stellar.plugins.swiper) stellar.loadCSS(stellar.plugins.swiper.css)
    },
  },
  load: {
    swiper: () => {
      if (stellar.plugins.swiper) {
        const swiper_api = document.getElementById('swiper-api')
        if (swiper_api != undefined) {
          stellar.loadCSS(stellar.plugins.swiper.css)
          stellar
            .loadScript(stellar.plugins.swiper.js, { defer: true })
            .then(stellaris.init.swiper)
        }
      }
    },
    scrollReveal: () => {
      if (stellar.plugins.scrollreveal) {
        stellar
          .loadScript(stellar.plugins.scrollreveal.js)
          .then(stellaris.init.scrollReveal)
      }
    },
    lazyLoad: () => {
      if (stellar.plugins.lazyload) {
        stellar.loadScript(stellar.plugins.lazyload.js, { defer: true })
        // https://www.npmjs.com/package/vanilla-lazyload
        // Set the options globally
        // to make LazyLoad self-initialize
        window.lazyLoadOptions = {
          elements_selector: '.lazy',
        }
        // Listen to the initialization event
        // and get the instance of LazyLoad
        window.addEventListener(
          'LazyLoad::Initialized',
          (event) => {
            window.lazyLoadInstance = event.detail.instance
          },
          false
        )
        stellaris.init.lazyLoad()
      }
    },
    fancyBox: () => {
      if (stellar.plugins.fancybox) {
        let selector = 'img[fancybox]:not(.error)'
        if (stellar.plugins.fancybox.selector) {
          selector += `, ${stellar.plugins.fancybox.selector}`
        }
        stellaris.pluginsConfig.fancyBoxSelector = selector
        stellar.loadCSS(stellar.plugins.fancybox.css)
        stellar
          .loadScript(stellar.plugins.fancybox.js, { defer: true })
          .then(stellaris.init.fancyBox)
      }
    },
    search: () => {
      if (stellar.search.service && stellar.search.service == 'local_search') {
        stellar
          .loadScript(stellar.search.js, { defer: true })
          .then(stellaris.init.search)
      }
    },
    copyCode: () => {
      if (stellar.plugins.copycode) {
        stellar.loadScript(stellar.plugins.copycode.js, { defer: true })
      }
    },
    themePlugins: () => {
      // stellar js
      if (stellar.plugins.stellar) {
        for (let key of Object.keys(stellar.plugins.stellar)) {
          stellar.loadScript(stellar.plugins.stellar[key], { defer: true })
          if (key == 'timeline') {
            stellar.loadScript(stellar.plugins.marked)
          }
        }
      }
    },
  },
  loadNeededCSS: () => {
    ;['fancyBox', 'swiper'].forEach((css) => {
      stellaris.loadCSS[css]()
    })
  },
  loadAllPlugins: () => {
    ;[
      'scrollReveal',
      'lazyLoad',
      'fancyBox',
      'swiper',
      'search',
      'copyCode',
      'themePlugins',
    ].forEach((plugin) => {
      stellaris.load[plugin]()
    })
  },
  loadNeededPlugins: () => {
    ;['lazyLoad', 'fancyBox', 'swiper'].forEach((plugin) => {
      stellaris.load[plugin]()
    })
  },
  init: {
    toc: () => {
      stellaris.onDocReady(() => {
        const scrollOffset = 32
        const segs = Array.from(document.querySelectorAll('article.md-text :header'))
        
        // 监听滚动事件
        const handleScroll = () => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop
          let topSeg = null
          
          for (const seg of segs) {
            if (seg.offsetTop > scrollTop + scrollOffset) {
              continue
            }
            if (!topSeg || seg.offsetTop >= topSeg.offsetTop) {
              topSeg = seg
            }
          }
          
          if (topSeg) {
            // 清除所有活动链接
            document.querySelectorAll('.toc#toc a.toc-link').forEach(link => 
              link.classList.remove('active')
            )
            
            const link = '#' + topSeg.id
            if (link !== '#undefined') {
              const highlightSelector = `.toc#toc a.toc-link[href="${encodeURI(link)}"]`
              const highlightItem = document.querySelector(highlightSelector)
              
              if (highlightItem) {
                highlightItem.classList.add('active')
                const e0 = document.querySelector('.widgets')
                if (e0) {
                  const e1 = document.querySelector(highlightSelector)
                  const offsetBottom = e1.getBoundingClientRect().bottom - 
                                      e0.getBoundingClientRect().bottom + 200
                  const offsetTop = e1.getBoundingClientRect().top - 
                                   e0.getBoundingClientRect().top - 64
                  
                  if (offsetTop < 0) {
                    e0.scrollBy(0, offsetTop)
                  } else if (offsetBottom > 0) {
                    e0.scrollBy(0, offsetBottom)
                  }
                }
              }
            } else {
              const firstLink = document.querySelector('.toc#toc a.toc-link:first-child')
              if (firstLink) firstLink.classList.add('active')
            }
          }
        }
        
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // 初始化调用一次
      })
    },
    sidebar: () => {
      stellaris.onDocReady(() => {
        document.querySelectorAll('.toc#toc a.toc-link').forEach(link => {
          link.addEventListener('click', () => {
            const l_body = document.querySelector('.l_body')
            if (l_body && l_body.classList.contains('mobile') && l_body.classList.contains('sidebar')) {
              sidebar.toggle()
            }
          })
        })
      })
    },
    clickEvents: () => {
      stellaris.onDocReady(() => {
        const elements = document.querySelectorAll('.on-click-event')
        elements.forEach((el) => {
          el.setAttribute('onclick', el.getAttribute('data-on-click'))
          el.removeAttribute('data-on-click')
        })
      })
    },
    relativeDate: () => {
      document.querySelectorAll('#post-meta time').forEach((item) => {
        const $this = item
        const timeVal = $this.getAttribute('datetime')
        let relativeValue = util.diffDate(timeVal, true)
        if (relativeValue) {
          $this.innerText = relativeValue
        }
      })
    },
    /**
     * Tabs tag listener (without twitter bootstrap).
     */
    registerTabsTag: function () {
      // Binding `nav-tabs` & `tab-content` by real time permalink changing.
      document.querySelectorAll('.tabs .nav-tabs .tab').forEach((element) => {
        element.addEventListener('click', (event) => {
          event.preventDefault()
          // Prevent selected tab to select again.
          if (element.classList.contains('active'))
            return // Add & Remove active class on `nav-tabs` & `tab-content`.
          ;[...element.parentNode.children].forEach((target) => {
            target.classList.toggle('active', target === element)
          })
          // https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
          const tActive = document.getElementById(
            element.querySelector('a').getAttribute('href').replace('#', '')
          )
          ;[...tActive.parentNode.children].forEach((target) => {
            target.classList.toggle('active', target === tActive)
          })
          // Trigger event
          tActive.dispatchEvent(
            new Event('tabs:click', {
              bubbles: true,
            })
          )
        })
      })

      window.dispatchEvent(new Event('tabs:register'))
    },
    outdatedCheck: () => {
      if (stellar.article.outdate_month == 0) return
      const outdatedEl = document.getElementById('outdated')
      if (!outdatedEl) return

      const judgeOutdated = (postDate, nowDate) => {
        //判断这两个日期是否相差三个月以上
        if (nowDate.getFullYear() - postDate.getFullYear() > 0) {
          return true
        } else {
          return (
            nowDate.getMonth() - postDate.getMonth() >
            stellar.article.outdate_month
          )
        }
      }

      const postMetaTimes = document
        .getElementById('post-meta')
        .getElementsByTagName('time')
      if (outdatedEl !== null) {
        if (
          judgeOutdated(
            new Date(postMetaTimes[postMetaTimes.length - 1].dateTime), // postDate
            new Date() // nowDate
          )
        ) {
          outdatedEl.innerText = '，文章内容可能已经过时'
        }
      }
    },
    search: () => {
      if (stellar.search.service && stellar.search.service == 'local_search') {
        stellaris.onDocReady(() => {
          const $inputArea = document.querySelector('input#search-input')
          if (!$inputArea) return
          $inputArea.focus()
          $inputArea.addEventListener('input', function () {
            let path
            if (stellar.search.service in stellar.search) {
              path = stellar.search[stellar.search.service].path
            } else {
              path = '/search.json'
            }
            if (!path.startsWith('/')) {
              path = '/' + path
            }
            const filter = $inputArea.getAttribute('data-filter') || ''
            searchFunc(path, filter, 'search-input', 'search-result')
          })
          $inputArea.addEventListener('keydown', function (e) {
            if (e.which == 13) {
              e.preventDefault()
            }
          })

          new MutationObserver(function (mutationsList, observer) {
            if (mutationsList.length == 1) {
              if (mutationsList[0].addedNodes.length) {
                document.querySelector('.search-wrapper').classList.remove('noresult')
              } else if (mutationsList[0].removedNodes.length) {
                document.querySelector('.search-wrapper').classList.add('noresult')
              }
            }
          }).observe(document.querySelector('div#search-result'), {
            childList: true,
          })
        })
      }
    },
    swiper: () => {
      if (stellar.plugins.swiper && 'Swiper' in window) {
        const effect = swiper_api.getAttribute('effect') || ''
        window.swiper = new Swiper('.swiper#swiper-api', {
          slidesPerView: 'auto',
          spaceBetween: 8,
          centeredSlides: true,
          effect: effect,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        })
      }
    },
    scrollReveal: () => {
      if (stellar.plugins.scrollreveal && 'ScrollReveal' in window) {
        const selector = 'body .reveal',
          sr = window.ScrollReveal()
        sr.destroy()
        document.querySelectorAll(selector).forEach((e) => {
          ;['opacity', 'transform'].forEach((cls) => {
            e.style[cls] = null
          })
        })

        const { distance, duration, interval, scale } =
          stellar.plugins.scrollreveal
        setTimeout(() => {
          sr.reveal(selector, {
            distance,
            duration,
            interval,
            scale,
            easing: 'ease-out',
          })
        }, 50)
      }
    },
    lazyLoad: () => {
      if (stellar.plugins.lazyload && 'lazyLoadInstance' in window) {
        window.lazyLoadInstance.update()
      }
    },
    fancyBox: () => {
      if (stellar.plugins.fancybox && 'Fancybox' in window) {
        const selector = stellaris.pluginsConfig.fancyBoxSelector
        if (document.querySelectorAll(selector).length !== 0) {
          Fancybox.bind(selector, {
            groupAll: true,
            hideScrollbar: false,
            Thumbs: {
              autoStart: false,
            },
            caption: function (fancybox, carousel, slide) {
              return slide.$trigger.alt || null
            },
          })
        }
      }
    },
    themePlugins: () => {
      if (stellar.plugins.stellar) {
        Object.keys(stellaris.themePlugins).forEach((selector) => {
          const els = document.querySelectorAll(selector)
          if (els != undefined && els.length > 0) {
            this.onDocReady(() => {
              stellaris.themePlugins[selector].init()
            })
          }
        })
      }
    },
  },
  initPageComponents: () => {
    ;[
      'toc',
      'sidebar',
      'clickEvents',
      'relativeDate',
      'registerTabsTag',
      'outdatedCheck',
    ].forEach((component) => {
      stellaris.init[component]()
    })
  },
  initPlugins: () => {
    ;[
      'scrollReveal',
      'lazyLoad',
      'fancyBox',
      'swiper',
      'search',
      'themePlugins',
    ].forEach((plugin) => {
      stellaris.init[plugin]()
    })
  },
  initOnFirstLoad: () => {
    console.log(`New page loaded: ${window.location.pathname}`)
    stellaris.loadNeededPlugins()
    stellaris.initPageComponents()
  },
  initOnPageChange: () => {
    console.log(`Page loaded: ${window.location.pathname}`)
    stellaris.loadNeededCSS()
    stellaris.loadNeededPlugins()
    stellaris.initPageComponents()
    stellaris.initPlugins()
  },
}

// 页面加载完成后执行
stellaris.onDocReady(() => {
  // 执行初始化
  stellaris.init.toc()
  stellaris.init.sidebar()
  
  // 加载所需的CSS和插件
  stellaris.loadNeededCSS()
  stellaris.loadNeededPlugins()
  
  // 检查文章过期提示
  if (stellar.article?.outdate_month > 0) {
    const articles = document.querySelectorAll('article.md-text')
    if (articles.length > 0) {
      articles.forEach(article => {
        const date = article.querySelector('.meta .date')
        if (date) {
          const dateStr = date.getAttribute('time')
          if (dateStr) {
            const judgeOutdated = (postDate, nowDate) => {
              const limitMonth = stellar.article.outdate_month
              if (!limitMonth || !postDate || !nowDate) return false
              
              let datePost = new Date(postDate)
              let dateNow = new Date(nowDate)
              if (!/^\d+$/.test(postDate)) {
                datePost = new Date(postDate.replace(/-/g, '/'))
              }
              if (!/^\d+$/.test(nowDate)) {
                dateNow = new Date(nowDate.replace(/-/g, '/'))
              }
              
              const differMonths = (dateNow.getFullYear() - datePost.getFullYear()) * 12 + 
                                  (dateNow.getMonth() - datePost.getMonth())
              return differMonths >= limitMonth
            }
            
            const now = Date.now()
            if (judgeOutdated(new Date(dateStr).getTime(), now)) {
              const warning = document.createElement('div')
              warning.classList.add('article-outdated')
              warning.innerHTML = `<i class="fa-solid fa-exclamation-circle" aria-hidden="true"></i> `+
                                 `本文最后更新于 ${util.diffDate(dateStr, true)}，文中内容可能已过时，请谨慎使用。`
              
              const target = article.querySelector('.article-footer')
              if (target) {
                target.insertAdjacentElement('beforebegin', warning)
              }
            }
          }
        }
      })
    }
  }
})

window.addEventListener('load', stellaris.loadAllPlugins, false)
window.addEventListener('load', stellaris.initOnFirstLoad, false)
InstantClick.on('change', stellaris.initOnPageChange)
