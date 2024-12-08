function checkOutdatedBrowser() {
  'use strict'

  if ('ActiveXObject' in window) {
    return false
  }

  if (typeof Symbol == 'undefined') return false
  try {
    eval('class Foo {}')
    eval('var bar = (x) => x+1')
  } catch (e) {
    return false
  }

  return true
}

if (checkOutdatedBrowser() === false) {
  document.getElementById('start').innerHTML =
    '<div style="margin-top: 32px"><h1>喔唷!</h1><p><span>你的浏览器太老了，无法正常浏览本站。</span><br/><span>请升级你的浏览器。</span></p><hr/><p><span>支持的浏览器版本如下:</span><ul><li>Chrome 58+</li><li>Firefox 52+</li><li>Edge 14+</li><li>Opera 45+</li><li>Safari 10+</li></ul></p></div>'
}
