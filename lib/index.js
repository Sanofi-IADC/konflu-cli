#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clear_1 = __importDefault(require("clear"));
const commander_1 = __importDefault(require("commander"));
const inquirer_1 = __importDefault(require("inquirer"));
const intro_1 = __importDefault(require("./intro"));
const login_1 = __importDefault(require("./login"));
const copyPage_1 = __importDefault(require("./copyPage"));
const getPage_1 = __importDefault(require("./getPage"));
const addLabel_1 = __importDefault(require("./addLabel"));
const deletePages_1 = __importDefault(require("./deletePages"));
const deleteChildren_1 = __importDefault(require("./deleteChildren"));
const queryParams = () => {
    const qs = [
        {
            name: 'what',
            type: 'list',
            message: 'What do you want to do?',
            choices: [
                'Login to Confluence API',
                'Copy Page Hierarchy',
                'Copy Permissions',
                'Get Page',
                'Add Label',
                'Delete Pages',
                'Delete Children',
                'Exit',
            ],
        },
    ];
    return inquirer_1.default.prompt(qs);
};
commander_1.default
    .version('0.0.1')
    .description("An example CLI for ordering pizza's")
    .option('-p, --peppers', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbq', 'Add bbq sauce')
    .option('-c, --cheese <type>', 'Add the specified type of cheese [marble]')
    .option('-C, --no-cheese', 'You do not want any cheese')
    .parse(process.argv);
const run = async () => {
    clear_1.default();
    intro_1.default();
    const { what } = await queryParams();
    console.log('Going to %s', what);
    switch (what) {
        case 'Login to Confluence API':
            login_1.default();
            break;
        case 'Copy Page Hierarchy':
            copyPage_1.default();
            break;
        case 'Copy Permissions':
            break;
        case 'Get Page':
            getPage_1.default();
            break;
        case 'Add Label':
            addLabel_1.default();
            break;
        case 'Delete Pages':
            deletePages_1.default();
            break;
        case 'Delete Children':
            deleteChildren_1.default();
            break;
        default:
            console.log('Thanks for using Konflu!');
    }
};
run();
