import spawnd from 'spawnd'
import cwd from 'cwd'
import waitPort from 'wait-port'
import readConfig from './readConfig'
import { DIR, WS_ENDPOINT_PATH } from './constants'

let server

export async function setupServer(config) {
  server = spawnd(config.command, {
    shell: true,
    env: process.env,
    cwd: cwd(),
    ...config.options,
  })

  if (config.port) {
    await waitPort({ port: config.port, output: 'silent' })
  }
}

export async function teardownServer() {
  if (server) await server.destroy()
}
