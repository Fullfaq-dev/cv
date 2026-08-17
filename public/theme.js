(() => {
  const root = document.documentElement
  const media = window.matchMedia('(prefers-color-scheme: dark)')

  const systemTheme = () => (media.matches ? 'dark' : 'light')

  const current = () => root.dataset.theme || systemTheme()

  const sync = (theme) => {
    document.querySelectorAll('[data-theme-label]').forEach((node) => {
      node.textContent = localStorage.getItem('theme') ? theme : 'auto'
    })
    document.querySelectorAll('.theme-switch').forEach((node) => {
      node.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false')
      node.dataset.mode = theme
    })
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#111210' : '#f4f2ec')
  }

  const apply = (theme) => {
    root.dataset.theme = theme
    sync(theme)
  }

  const boot = () => {
    const stored = localStorage.getItem('theme')
    if (stored) apply(stored)
    else {
      root.removeAttribute('data-theme')
      sync(systemTheme())
    }
  }

  const setTheme = (theme, event) => {
    localStorage.setItem('theme', theme)
    const x = event?.clientX ?? window.innerWidth / 2
    const y = event?.clientY ?? window.innerHeight / 2
    root.style.setProperty('--reveal-x', `${x}px`)
    root.style.setProperty('--reveal-y', `${y}px`)

    const go = () => apply(theme)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce && typeof document.startViewTransition === 'function') {
      document.startViewTransition(go)
    } else {
      root.classList.add('theme-fade')
      go()
      window.setTimeout(() => root.classList.remove('theme-fade'), 500)
    }
  }

  const toggle = (event) => {
    setTheme(current() === 'dark' ? 'light' : 'dark', event)
  }

  boot()
  media.addEventListener('change', () => {
    if (!localStorage.getItem('theme')) sync(systemTheme())
  })

  document.addEventListener('click', (event) => {
    const button = event.target.closest?.('.theme-switch')
    if (button) toggle(event)
  })

  window.__theme = { current, setTheme, toggle }
})()
