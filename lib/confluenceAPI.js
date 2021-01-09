"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const axiosProxy_1 = require("./axiosProxy");
const config_1 = __importDefault(require("./config"));
class ConfluenceClient {
    constructor() {
        const axiosConfig = {
            baseURL: `${config_1.default.get('confluence.url')}/wiki`,
            auth: {
                username: config_1.default.get('confluence.username'),
                password: config_1.default.get('confluence.tokenAPI'),
            },
        };
        this.axiosCli = axios_1.default.create({
            ...axiosConfig,
            ...axiosProxy_1.buildAxiosProxyConfig(),
        });
    }
    async copyPageHierarchy(sourcePageId, targetPageId, copyOptions = {}) {
        const url = `/rest/api/content/${sourcePageId}/pagehierarchy/copy`;
        const params = {
            destinationPageId: `${targetPageId}`,
            ...copyOptions,
        };
        try {
            const res = await this.axiosCli.post(url, params);
            return res.data;
        }
        catch (err) {
            console.error('Something went wrong! \n', err);
            console.error('URL : ', url);
            console.error('Params : ', params);
            return undefined;
        }
    }
    async addLabel(pageId, label) {
        const url = `/rest/api/content/${pageId}/label`;
        const params = {
            prefix: 'global',
            name: `${label}`,
        };
        try {
            const res = await this.axiosCli.post(url, params);
            return res.data;
        }
        catch (err) {
            console.error('Something went wrong! \n', err);
            console.error('URL : ', url);
            console.error('Params : ', params);
            return undefined;
        }
    }
    async getPageContent(pageId) {
        try {
            const res = await this.axiosCli.get(`/rest/api/content/${pageId}`, {
                params: {
                    expand: [
                        'body.styled_view',
                        'metadata.labels',
                        'version,history',
                    ].join(','),
                },
            });
            return res.data;
        }
        catch (err) {
            console.error(err);
            return undefined;
        }
    }
    async getChildren(pageId) {
        try {
            const res = await this.axiosCli.get(`/rest/api/content/${pageId}/descendant`, {
                params: {
                    expand: 'page',
                },
            });
            return res.data;
        }
        catch (err) {
            console.error(err);
            return undefined;
        }
    }
    async getTaskStatus(taskId) {
        try {
            const res = await this.axiosCli.get(`/rest/api/longtask/${taskId}`);
            return res.data;
        }
        catch (err) {
            console.error(err);
            return undefined;
        }
    }
    async deletePage(pageId) {
        try {
            const res = await this.axiosCli.delete(`/rest/api/content/${pageId}`);
            return res;
        }
        catch (err) {
            console.error(err);
            return undefined;
        }
    }
}
exports.default = ConfluenceClient;
