const environment: string = process.env.NODE_ENV
const port: number = parseInt(process.env.PORT)
const locale: string = process.env.DEFAULT_LANGUAGE
const url = process.env.URL || `http://localhost:${port}`
const platformName = process.env.PLATFORM_NAME

const env = { environment, port, locale, url, platformName }

export { environment, port, locale, url, platformName }
export default env
