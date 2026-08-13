import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { renderAiHtml, renderAiJson, renderGateHtml, renderLlmsTxt } from './src/aiDump'

const root = dirname(fileURLToPath(import.meta.url))

function writeIfChanged(file: string, contents: string) {
  try {
    if (readFileSync(file, 'utf8') === contents) return
  } catch {
    // file missing
  }
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, contents)
}

function writeAiPages() {
  const html = renderAiHtml()
  const llms = renderLlmsTxt()
  writeIfChanged(resolve(root, 'index.html'), renderGateHtml())
  writeIfChanged(resolve(root, 'public/ai.html'), html)
  writeIfChanged(resolve(root, 'public/ai/index.html'), html)
  writeIfChanged(resolve(root, 'public/ai.json'), renderAiJson())
  writeIfChanged(resolve(root, 'public/llms.txt'), llms)
  writeIfChanged(resolve(root, 'public/.well-known/llms.txt'), llms)
  writeIfChanged(resolve(root, 'public/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://maxcv.fun/</loc></url>
  <url><loc>https://maxcv.fun/human.html</loc></url>
  <url><loc>https://maxcv.fun/ai.html</loc></url>
  <url><loc>https://maxcv.fun/llms.txt</loc></url>
  <url><loc>https://maxcv.fun/ai.json</loc></url>
</urlset>
`)
}

function serveAiHtml(server: { middlewares: { use: (fn: (req: { url?: string }, res: { setHeader: (name: string, value: string) => void; end: (body: string) => void }, next: () => void) => void) => void } }) {
  writeAiPages()
  server.middlewares.use((req, res, next) => {
    const path = req.url?.split('?')[0]
    if (path !== '/ai' && path !== '/ai/' && path !== '/ai.html') {
      next()
      return
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(renderAiHtml())
  })
}

function aiPagesPlugin(): Plugin {
  return {
    name: 'ai-pages',
    enforce: 'pre',
    buildStart() {
      writeAiPages()
    },
    configureServer(server) {
      serveAiHtml(server)
    },
    configurePreviewServer(server) {
      serveAiHtml(server)
    },
  }
}

export default defineConfig({
  appType: 'mpa',
  plugins: [react(), aiPagesPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        human: resolve(root, 'human.html'),
      },
    },
  },
})
