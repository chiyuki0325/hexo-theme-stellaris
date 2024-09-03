// Adapted from https://github.com/ThatCoders/thatcoders.github.io
const themeModeList = ['light', 'dark', 'auto']

const applyTheme = (theme) => {
  document.getElementById('darkmode-switch-'+theme).className = 'darkmode-switch-hide';
  let nextTheme = themeModeList[(themeModeList.indexOf(theme) + 1) % themeModeList.length]
  document.getElementById('darkmode-switch-'+nextTheme).className = 'darkmode-switch-show';
  document.documentElement.setAttribute('data-theme', theme)
}

const switchTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    let nextTheme = themeModeList[(themeModeList.indexOf(currentTheme) + 1) % themeModeList.length]
    applyTheme(nextTheme)
    window.localStorage.setItem('Stellaris.theme', nextTheme)
    const messages = {
      light: `切换到浅色模式`,
      dark: `切换到深色模式`,
      auto: `切换到跟随系统配色`,
    }
    hud?.toast?.(messages[nextTheme])
  }


var ThemeChange = (theme) => {
  // 强制切换主题模式
  document.getElementById('darkmode-switch-auto').className = 'darkmode-switch-hide';
  document.getElementById('darkmode-switch-light').className = 'darkmode-switch-hide';
  document.getElementById('darkmode-switch-dark').className = 'darkmode-switch-hide';
  if(theme == null){
    theme = 'auto';
  }
  applyTheme(theme);
  window.localStorage.setItem('Stellaris.theme', theme);
}

var ThemeChangeOnload = (theme) => {
  if(theme == null){
    theme = 'auto';
  }
  document.documentElement.setAttribute('data-theme', theme)
  window.localStorage.setItem('Stellaris.theme', theme);
}

var OSTheme = window.matchMedia('(prefers-color-scheme: dark)');
OSTheme.addEventListener('change', e => {
  if (document.documentElement.getAttribute('data-theme') === 'auto') {
    ThemeChange('auto');
  }
})

ThemeChangeOnload(window.localStorage.getItem('Stellaris.theme'));
let currentTheme, nextTheme;