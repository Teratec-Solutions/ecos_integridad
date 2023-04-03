"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const compression_1 = (0, tslib_1.__importDefault)(require("compression"));
const cookie_parser_1 = (0, tslib_1.__importDefault)(require("cookie-parser"));
const cors_1 = (0, tslib_1.__importDefault)(require("cors"));
const configs_1 = (0, tslib_1.__importDefault)(require("./configs"));
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const helmet_1 = (0, tslib_1.__importDefault)(require("helmet"));
const hpp_1 = (0, tslib_1.__importDefault)(require("hpp"));
const morgan_1 = (0, tslib_1.__importDefault)(require("morgan"));
const mongoose_1 = require("mongoose");
const swagger_jsdoc_1 = (0, tslib_1.__importDefault)(require("swagger-jsdoc"));
const swagger_ui_express_1 = (0, tslib_1.__importDefault)(require("swagger-ui-express"));
const _databases_1 = require("./databases");
const error_middleware_1 = (0, tslib_1.__importDefault)(require("./middlewares/error.middleware"));
const logger_1 = require("./utils/logger");
const i18n_1 = (0, tslib_1.__importDefault)(require("i18n"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const index_route_1 = (0, tslib_1.__importDefault)(require("./routes/index.route"));
const accessControl_service_1 = (0, tslib_1.__importDefault)(require("./services/accessControl.service"));
const socket_controller_1 = (0, tslib_1.__importDefault)(require("./controllers/socket.controller"));
const multer_1 = (0, tslib_1.__importDefault)(require("multer"));
process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';
const app = (0, express_1.default)();
const port = configs_1.default.env.port;
const env = configs_1.default.env.environment;
const locale = configs_1.default.env.locale;
const connectToDatabase = () => {
    if (env !== 'production') {
        (0, mongoose_1.set)('debug', true);
    }
    (0, mongoose_1.connect)(_databases_1.dbConnection.url, _databases_1.dbConnection.options, async () => {
        console.log('#######Conectado a: ', _databases_1.dbConnection.url);
        /* const user = await AccessControlServices.createSuperAdmin() */
        await accessControl_service_1.default.initAccessControl();
        /* console.log(user) */
    });
};
const initializeMiddlewares = () => {
    if (env === 'development') {
        app.use((0, morgan_1.default)(configs_1.default.log.format, { stream: logger_1.stream }));
    }
    app.use((0, cors_1.default)({ origin: configs_1.default.cors.origin, credentials: configs_1.default.cors.credentials }));
    app.use((0, hpp_1.default)());
    app.use((0, compression_1.default)());
    app.use((0, multer_1.default)().any());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    configureI18n();
    app.use(i18n_1.default.init);
    initializeRoutes();
    app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../ecos_integridad/build")));
    app.get('/*', (req, res) => {
        console.log(path_1.default.resolve(__dirname, "../../ecos_integridad/build", "index.html"));
        res.sendFile(path_1.default.resolve(__dirname, "../../ecos_integridad/build", "index.html"));
    });
    app.use((0, helmet_1.default)());
};
const initializeRoutes = () => {
    app.use('/', index_route_1.default);
};
const initializeSwagger = () => {
    const options = {
        swaggerDefinition: {
            info: {
                title: 'REST API',
                version: '1.0.0',
                description: 'Example docs'
            }
        },
        apis: ['swagger.yaml']
    };
    const specs = (0, swagger_jsdoc_1.default)(options);
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
};
const initializeErrorHandling = () => {
    app.use(error_middleware_1.default);
};
const configureI18n = () => {
    i18n_1.default.configure({
        directory: __dirname + '/locales',
        defaultLocale: locale,
        queryParameter: 'language',
        cookie: 'language',
        register: global
    });
};
const App = () => {
    connectToDatabase();
    initializeMiddlewares();
    initializeSwagger();
    initializeErrorHandling();
    const server = app.listen(port, () => {
        logger_1.logger.info(`=================================`);
        logger_1.logger.info(`======= ENV: ${env} =======`);
        logger_1.logger.info(`🚀 App listening on the port ${port}`);
        logger_1.logger.info(`=================================`);
    });
    (0, socket_controller_1.default)(server);
};
exports.default = App;
//# sourceMappingURL=app.js.map