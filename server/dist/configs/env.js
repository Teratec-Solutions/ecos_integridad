"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfContainer = exports.reportImagesContainer = exports.accessKeys = exports.storageUrl = exports.account = exports.platformName = exports.url = exports.locale = exports.port = exports.environment = void 0;
const environment = process.env.NODE_ENV;
exports.environment = environment;
const port = parseInt(process.env.PORT);
exports.port = port;
const locale = process.env.DEFAULT_LANGUAGE;
exports.locale = locale;
const url = process.env.URL || `http://localhost:${port}`;
exports.url = url;
const platformName = process.env.PLATFORM_NAME;
exports.platformName = platformName;
const account = process.env.AZURE_ACCOUNT;
exports.account = account;
const accountKey = process.env.TOKEN_SAS_BLOB;
const storageUrl = process.env.STORAGE_URL;
exports.storageUrl = storageUrl;
/* const urlWithKey = process.env.URL_SAS_BLOB */
const accessKeys = process.env.ACCESS_KEYS;
exports.accessKeys = accessKeys;
const reportImagesContainer = process.env.REPORT_IMAGES_CONTAINER;
exports.reportImagesContainer = reportImagesContainer;
const pdfContainer = process.env.PDF_CONTAINER;
exports.pdfContainer = pdfContainer;
const env = { environment, port, locale, url, platformName, account, /* accountKey, */ storageUrl, /* urlWithKey, */ accessKeys, reportImagesContainer, pdfContainer };
exports.default = env;
//# sourceMappingURL=env.js.map