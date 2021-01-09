"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = exports.successMsg = void 0;
const chalk_1 = __importDefault(require("chalk"));
const successMsg = (msg) => {
    console.log(chalk_1.default.grey.bgGreen.bold(msg));
};
exports.successMsg = successMsg;
const wait = async (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});
exports.wait = wait;
