const environment: string = process.env.NODE_ENV
const port: number = parseInt(process.env.PORT)
const locale: string = process.env.DEFAULT_LANGUAGE
const url = process.env.URL || `http://localhost:${port}`
const platformName = process.env.PLATFORM_NAME
const account = process.env.AZURE_ACCOUNT
const accountKey = process.env.TOKEN_SAS_BLOB
const storageUrl = process.env.STORAGE_URL
/* const urlWithKey = process.env.URL_SAS_BLOB */
const accessKeys = process.env.ACCESS_KEYS
const reportImagesContainer = process.env.REPORT_IMAGES_CONTAINER
const pdfContainer = process.env.PDF_CONTAINER

const env = { environment, port, locale, url, platformName, account, /* accountKey, */ storageUrl, /* urlWithKey, */ accessKeys, reportImagesContainer, pdfContainer }

export { environment, port, locale, url, platformName, account, /* accountKey, */ storageUrl, /* urlWithKey, */ accessKeys, reportImagesContainer, pdfContainer }
export default env
