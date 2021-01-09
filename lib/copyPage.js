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
            name: 'sourcePageId',
            type: 'number',
            message: 'Write the ID of the original page (parent)',
        },
        {
            name: 'targetPageId',
            type: 'number',
            message: 'Write the ID of the target parent page',
        },
        {
            name: 'options',
            type: 'checkbox',
            message: 'What do you want to copy?',
            choices: [
                { name: 'Attachments', value: 'copyAttachments' },
                { name: 'Permissions', value: 'copyPermissions' },
                { name: 'Labels', value: 'copyLabels' },
                { name: 'Custom Content', value: 'copyCustomContents', checked: true },
            ],
        },
        {
            name: 'confirm',
            type: 'confirm',
            message: 'Do you want to launch the copy?',
        },
    ];
    return inquirer_1.default.prompt(qs);
};
const copyPage = async () => {
    console.log(chalk_1.default.green('\nCopying Confluence page...'));
    const answers = await queryParams();
    const { sourcePageId, targetPageId, options, confirm } = answers;
    const copyOptions = {};
    options.forEach((option) => {
        copyOptions[option] = true;
    });
    if (confirm) {
        const { Spinner } = clui_1.default;
        const spinner = new Spinner(`Copying page hierarchy from ${sourcePageId} to ${targetPageId}...`);
        spinner.start();
        const confluenceclient = new confluenceAPI_1.default();
        const task = await confluenceclient.copyPageHierarchy(sourcePageId, targetPageId, copyOptions);
        if (task) {
            let status;
            do {
                status = await confluenceclient.getTaskStatus(task.id);
                await helpers_1.wait(500);
            } while (!status.finished);
            spinner.stop();
            helpers_1.successMsg(`Done! Page hierarchy copied from ${sourcePageId} to ${targetPageId}.\n\n`);
        }
    }
    else {
        helpers_1.successMsg('See you soon!\n\n');
    }
};
exports.default = copyPage;
