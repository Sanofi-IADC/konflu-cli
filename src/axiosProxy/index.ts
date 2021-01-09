/* eslint-disable import/prefer-default-export */
// Axios is not able to perform HTTPS over HTTP (HTTP "CONNECT" query) automatically
// We have to configure it to use an agent explicitly
//
// Sources:
//  - https://janmolak.com/node-js-axios-behind-corporate-proxies-8b17a6f31f9d
//  - https://github.com/axios/axios/issues/925
//  - https://github.com/Rob--W/proxy-from-env
//
// Since the issue is still not fixed in Axios, this package could be open sourced :-)
import httpProxyAgent from "http-proxy-agent";
import httpsProxyAgent from "https-proxy-agent";
import { AxiosRequestConfig } from "axios";

function getEnv(key: string): string {
  return process.env[key.toLowerCase()] || process.env[key.toUpperCase()] || "";
}

export function buildAxiosProxyConfig(): AxiosRequestConfig {
  const res: AxiosRequestConfig = {};

  const httpProxy = getEnv("http_proxy") || getEnv("all_proxy");
  const httpsProxy = getEnv("https_proxy") || getEnv("all_proxy");
  if (httpsProxy && httpsProxy.indexOf("http://") === 0) {
    res.proxy = false;
    res.httpsAgent = httpsProxyAgent(httpsProxy);

    if (httpProxy) {
      res.httpAgent = httpProxyAgent(httpProxy);
    }
  }

  return res;
}
