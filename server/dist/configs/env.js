"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformName = exports.url = exports.locale = exports.port = exports.environment = void 0;
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
const env = { environment, port, locale, url, platformName };
exports.default = env;
//# sourceMappingURL=env.js.map