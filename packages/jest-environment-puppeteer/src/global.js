import fs from 'fs'
import { setup: setupServer, teardown: teardownServer } from 'jest-dev-server'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import puppeteer from 'puppeteer'
import readConfig from './readConfig'
import { DIR, WS_ENDPOINT_PATH } from './constants'

let browser

export async function setup() {
  const config = await readConfig()
  browser = await puppeteer.launch(config.launch)
  mkdirp.sync(DIR)
  fs.writeFileSync(WS_ENDPOINT_PATH, browser.wsEndpoint())

  if (config.server) await setupServer(config.server)
}

export async function teardown() {
  await teardownServer()
  await browser.close()
  rimraf.sync(DIR)
}
