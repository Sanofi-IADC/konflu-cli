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
            message: 'Write the ID of the Confluence page',
        },
        {
            name: 'label',
            type: 'input',
            message: 'Write the label name',
        },
        {
            name: 'confirm',
            type: 'confirm',
            message: 'Do you want to add the new label?',
        },
    ];
    return inquirer_1.default.prompt(qs);
};
const successMsg = (msg) => {
    console.log(chalk_1.default.grey.bgGreen.bold(msg));
};
const addLabel = async () => {
    console.log(chalk_1.default.green('\n Adding a label to a Confluence page...'));
    const answers = await queryParams();
    const { pageId, label, confirm } = answers;
    console.log('Params are %s and %s', pageId, label);
    if (confirm) {
        const confluenceclient = new confluenceAPI_1.default();
        await confluenceclient.addLabel(pageId, label);
        successMsg(`Done! Label ${label} add to page ${pageId}`);
    }
    else {
        successMsg('See you soon!');
    }
};
exports.default = addLabel;
