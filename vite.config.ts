import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdirSync, writeFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { renderAiHtml, renderAiJson, renderLlmsTxt } from './src/aiDump'

const root = dirname(fileURLToPath(import.meta.url))

function writeAiPages() {
  const html = renderAiHtml()
  mkdirSync(resolve(root, 'public/ai'), { recursive: true })
  writeFileSync(resolve(root, 'public/ai.html'), html)
  writeFileSync(resolve(root, 'public/ai/index.html'), html)
  writeFileSync(resolve(root, 'public/ai.json'), renderAiJson())
  writeFileSync(resolve(root, 'public/llms.txt'), renderLlmsTxt())
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
