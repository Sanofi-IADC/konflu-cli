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
            name: 'parent',
            type: 'input',
            message: 'Write the ID of the page to delete all its children',
        },
        {
            name: 'includeParent',
            type: 'confirm',
            message: 'Do you want to delete also the parent?',
            default: false,
        },
        {
            name: 'confirm',
            type: 'confirm',
            message: '[Dangerous Zone] Do you want to launch the deletion?',
            default: false,
        },
    ];
    return inquirer_1.default.prompt(qs);
};
const deleteChildren = async () => {
    console.log(chalk_1.default.green('\nDeleting Confluence pages...'));
    const answers = await queryParams();
    const { parent, includeParent, confirm } = answers;
    if (confirm) {
        const SpinnerStatus = clui_1.default.Spinner;
        const spinner = new SpinnerStatus(`Retrieving children from parent page with ID ${parent}...`);
        spinner.start();
        const confluenceclient = new confluenceAPI_1.default();
        const deletePages = [];
        const res = await confluenceclient.getChildren(parent);
        res.page.results.map(async (page) => {
            deletePages.push(page.id);
        });
        spinner.message(`Pages ${deletePages} to be deleted.\n`);
        const deletedPages = [];
        for (const pageId of deletePages) {
            const del = await confluenceclient.deletePage(pageId);
            if (del.status === 204) {
                spinner.message(`Page ${pageId} deleted with status ${del.status}\n`);
                deletedPages.push(pageId);
            }
            else {
                spinner.message(`Page ${pageId} not deleted with status ${del.status}`);
            }
            await helpers_1.wait(500);
        }
        if (includeParent) {
            const del = await confluenceclient.deletePage(parent);
            if (del.status === 204) {
                spinner.message(`Page ${parent} deleted with status ${del.status}`);
                deletedPages.push(parent);
            }
            else {
                spinner.message(`Page ${parent} not deleted with status ${del.status}`);
            }
        }
        spinner.stop();
        helpers_1.successMsg(`Done! Pages ${deletedPages} deleted.\n\n`);
    }
    else {
        helpers_1.successMsg('See you soon!\n\n');
    }
};
exports.default = deleteChildren;
