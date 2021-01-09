"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const validator_1 = __importDefault(require("validator"));
const config_1 = __importDefault(require("./config"));
const queryParams = () => {
    const qs = [
        {
            name: 'url',
            type: 'input',
            message: 'Enter your Atlassian URL base address:',
            default: 'https://iadc.atlassian.net',
            validate: (value) => validator_1.default.isURL(value) ? true : 'Please enter a proper URL.',
        },
        {
            name: 'username',
            type: 'input',
            message: 'Enter your Confluence e-mail address:',
            validate: (value) => validator_1.default.isEmail(value) ? true : 'Please enter your e-mail address.',
        },
        {
            name: 'tokenAPI',
            type: 'password',
            message: 'Enter your API token:',
            validate: (value) => (value.length ? true : 'Please enter your API key.'),
        },
    ];
    return inquirer_1.default.prompt(qs);
};
const successMsg = () => {
    console.log(chalk_1.default.grey.bgGreen.bold(` Done! Login credentials saved `));
};
const login = async () => {
    console.log(chalk_1.default.green('\nGetting Confluence credentials...'));
    const answers = await queryParams();
    const { url, username, tokenAPI } = answers;
    config_1.default.set('confluence.url', url);
    config_1.default.set('confluence.username', username);
    config_1.default.set('confluence.tokenAPI', tokenAPI);
    console.log('Params are %s, %s and %s', url, username, tokenAPI);
    successMsg();
};
exports.default = login;
