"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const clui_1 = __importDefault(require("clui"));
const confluenceAPI_1 = __importDefault(require("./confluenceAPI"));
const helpers_1 = require("./helpers");
const queryParams = () => {
    const qs = [
        {
            name: 'pages',
            type: 'input',
            message: 'Write the ID of the pages to delete separated by commas',
        },
        {
            name: 'confirm',
            type: 'confirm',
            message: '[Dangerous Zone] Do you want to launch the deletion?',
        },
    ];
    return inquirer_1.default.prompt(qs);
};
const deletePages = async () => {
    console.log(chalk_1.default.green('\nDeleting Confluence pages...'));
    const answers = await queryParams();
    const { pages, confirm } = answers;
    if (confirm) {
        const SpinnerStatus = clui_1.default.Spinner;
        const spinner = new SpinnerStatus(`Deleting pages...`);
        spinner.start();
        const pagesIds = pages.replace(/\s/g, '').split(',');
        const confluenceclient = new confluenceAPI_1.default();
        const deletedPages = [];
        for (const pageId of pagesIds) {
            const res = await confluenceclient.deletePage(pageId);
            if (res.status === 204) {
                spinner.message(`Page ${pageId} deleted with status ${res.status}`);
                deletedPages.push(pageId);
            }
            else {
                spinner.message(`Page ${pageId} not deleted with status ${res.status}`);
            }
            await helpers_1.wait(500);
        }
        spinner.stop();
        helpers_1.successMsg(`Done! Pages ${deletedPages} deleted.\n\n`);
    }
    else {
        helpers_1.successMsg('See you soon!\n\n');
    }
};
exports.default = deletePages;
