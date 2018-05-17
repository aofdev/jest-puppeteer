import stream from 'stream'
import chalk from 'chalk'
import spawnd from 'spawnd'
import cwd from 'cwd'
import waitPort from 'wait-port'

const serverLogPrefixer = new stream.Transform({
  transform(chunk, encoding, callback) {
    this.push(
      chalk.magentaBright(`[Jest Puppeteer server] ${chunk.toString()}`),
    )
    callback()
  },
})

let server

export async function setup(config) {
  server = spawnd(config.command, {
    shell: true,
    env: process.env,
    cwd: cwd(),
    ...config.options,
  })

  if (config.server.debug) {
    console.log(chalk.magentaBright('\nJest Puppeteer server output:'))
    server.stdout.pipe(serverLogPrefixer).pipe(process.stdout)
  }

  if (config.server.port) {
    const launchTimeout = config.server.launchTimeout || 5000
    const timeout = setTimeout(() => {
      console.error(
        chalk.red(
          `\nJest Puppeteer Error: Server has taken more than ${launchTimeout}ms to start.`,
        ),
      )
      console.error(
        chalk.blue(
          `You can set "server.launchTimeout" in jest-puppeteer.config.js`,
        ),
      )
      process.exit(1)
    }, launchTimeout)
    await waitPort({
      port: config.server.port,
      output: 'silent',
    })
    clearTimeout(timeout)
  }
}

export async function teardown() {
  if (server) await server.destroy()
}
