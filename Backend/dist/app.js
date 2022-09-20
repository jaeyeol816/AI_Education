"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const typeorm_1 = require("typeorm");
const app = (0, express_1.default)();
app.set('port', process.env.PORT || 80);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appDataSource = new typeorm_1.DataSource({
            type: "mysql",
            host: process.env.DB_URL,
            port: 3306,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [],
            synchronize: true,
            charset: 'UTF8_GENERAL_CI',
        });
        yield appDataSource.initialize();
        console.log('database connected!!');
    }
    catch (err) {
        console.log('db connection failed!!');
        console.error(err);
    }
    app.use((0, morgan_1.default)(process.env.NODE_ENV || 'dev'));
    app.get('/', (req, res) => {
        res.json({ signal: 'success~' });
    });
    app.listen(app.get('port'), () => {
        console.log('server waiting on port no.', app.get('port'));
    });
});
main();
//# sourceMappingURL=app.js.map