"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAxiosProxyConfig = void 0;
const http_proxy_agent_1 = __importDefault(require("http-proxy-agent"));
const https_proxy_agent_1 = __importDefault(require("https-proxy-agent"));
function getEnv(key) {
    return process.env[key.toLowerCase()] || process.env[key.toUpperCase()] || "";
}
function buildAxiosProxyConfig() {
    const res = {};
    const httpProxy = getEnv("http_proxy") || getEnv("all_proxy");
    const httpsProxy = getEnv("https_proxy") || getEnv("all_proxy");
    if (httpsProxy && httpsProxy.indexOf("http://") === 0) {
        res.proxy = false;
        res.httpsAgent = https_proxy_agent_1.default(httpsProxy);
        if (httpProxy) {
            res.httpAgent = http_proxy_agent_1.default(httpProxy);
        }
    }
    return res;
}
exports.buildAxiosProxyConfig = buildAxiosProxyConfig;
