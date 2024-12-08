;(() => {
  const CopyCode = {
    copyCode: async function (codeCopyBtn, currentCode) {
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(currentCode)
        } catch (error) {
          // 未获得用户许可
          codeCopyBtn.innerText = '未获得用户许可'
          codeCopyBtn.classList.add('warning')
          setTimeout(() => {
            codeCopyBtn.innerText = stellar.plugins.copycode.default_text
            codeCopyBtn.classList.remove('warning')
          }, 3000)
        }
      } else {
        codeCopyBtn.innerText = '当前浏览器不支持此API'
        codeCopyBtn.classList.add('warning')
        setTimeout(() => {
          codeCopyBtn.innerText = stellar.plugins.copycode.default_text
          codeCopyBtn.classList.remove('warning')
        }, 3000)
      }
    },
    init: function () {
      document.querySelectorAll('.code').forEach((codeElement) => {
        const codeElementStyle = window.getComputedStyle(
          codeElement,
          '::before'
        )
        const codeBeforeWidth = codeElementStyle.width.split('px')[0]
        const codeBeforePadding = codeElementStyle.padding
          .split(' ')
          .pop()
          .split('px')[0]

        // copy btn
        const codeCopyBtn = document.createElement('div')
        codeCopyBtn.classList.add('copy-btn')
        codeCopyBtn.style.right =
          Number(codeBeforeWidth) + Number(codeBeforePadding) * 2 + 'px'
        codeCopyBtn.innerText = stellar.plugins.copycode.default_text

        codeElement.appendChild(codeCopyBtn)

        codeCopyBtn.addEventListener('click', async function (evt) {
          const self = evt.target
          await CopyCode.copyCode(
            self,
            self.parentElement.children[0]?.innerText
          )

          self.innerText = stellar.plugins.copycode.success_text
          self.classList.add('success')

          setTimeout(() => {
            self.innerText = stellar.plugins.copycode.default_text
            self.classList.remove('success')
          }, 3000)
        })
      })
    },
  }
  stellaris.registerThemePlugin('.code', CopyCode)
})()
