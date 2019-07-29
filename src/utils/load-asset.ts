import { resolve } from 'path'
import { readFileSync } from 'fs'

let manifest: Record<string, any> | undefined = __ASSET_MANIFEST__ // provided by webpack, not a string
const assetHostName = process.env.ASSETS_HOSTNAME // path of S3 Bucket, don't actually use this in production
const rootDir = __ROOT_DIR__ // webpack defined var

// TODO: make async
export const getAsset = (name: string) => {
  if (!manifest) {
    manifest = JSON.parse(
      readFileSync(resolve(rootDir, './dist/manifest.json'), { encoding: 'UTF-8' }),
    ) as Record<string, any>
  }
  // TODO: why is this a [object Object] locally?
  const prefix =
    assetHostName !== '[object Object]' && assetHostName !== undefined
      ? `https://${assetHostName}`
      : ''
  return [prefix, manifest[name]].join('')
}
