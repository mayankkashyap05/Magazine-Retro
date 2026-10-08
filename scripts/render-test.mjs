import { createServer } from 'vite'

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'warn',
})
try {
  const mod = await server.ssrLoadModule('/scripts/ssr-test.jsx')
  const failed = mod.run()
  process.exitCode = failed ? 1 : 0
} finally {
  await server.close()
}
