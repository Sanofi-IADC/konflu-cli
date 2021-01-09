"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const confluenceAPI_1 = __importDefault(require("./confluenceAPI"));
const queryParams = () => {
    const qs = [
        {
            name: 'pageId',
            type: 'number',
            message: 'Write the ID of the page to retrieve',
        },
    ];
    return inquirer_1.default.prompt(qs);
};
const successMsg = (msg) => {
    console.log(chalk_1.default.grey.bgGreen.bold(msg));
};
const getPage = async () => {
    console.log(chalk_1.default.green('\nFetching Confluence page...'));
    const answers = await queryParams();
    const { pageId } = answers;
    console.log('Page ID %s ', pageId);
    const confluenceclient = new confluenceAPI_1.default();
    const page = await confluenceclient.getPageContent(pageId);
    console.log('Page Content is... \n ', page);
    successMsg(`Done! Page content fetched from ${pageId}`);
};
exports.default = getPage;
