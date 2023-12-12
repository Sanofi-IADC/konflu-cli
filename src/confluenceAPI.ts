import axios, { AxiosInstance } from 'axios'
import { buildAxiosProxyConfig } from './axiosProxy'
import config from './config'

class ConfluenceClient {
  private readonly axiosCli: AxiosInstance

  constructor() {
    const axiosConfig = {
      baseURL: `${config.get('confluence.url')}/wiki`,
      auth: {
        username: config.get('confluence.username'),
        password: config.get('confluence.tokenAPI'),
      },
    }
    this.axiosCli = axios.create({
      ...axiosConfig,
      ...buildAxiosProxyConfig(),
    })
  }

  async copyPageHierarchy(
    sourcePageId: string,
    targetPageId: string,
    copyOptions: any = {}
  ): Promise<any> {
    const url = `/rest/api/content/${sourcePageId}/pagehierarchy/copy`
    const params = {
      destinationPageId: `${targetPageId}`,
      ...copyOptions,
    }
    try {
      const res = await this.axiosCli.post(url, params)
      return res.data
    } catch (err) {
      console.error('Something went wrong! \n', err)
      console.error('URL : ', url)
      console.error('Params : ', params)
      return undefined
    }
  }

  async addLabel(pageId: string, label: string): Promise<any> {
    const url = `/rest/api/content/${pageId}/label`
    const params = {
      prefix: 'global',
      name: `${label}`,
    }
    try {
      const res = await this.axiosCli.post(url, params)
      return res.data
    } catch (err) {
      console.error('Something went wrong! \n', err)
      console.error('URL : ', url)
      console.error('Params : ', params)
      return undefined
    }
  }

  async getPageContent(pageId: string): Promise<any> {
    try {
      const res = await this.axiosCli.get(`/api/v2/pages/${pageId}`,
      { params: { 'body-format': 'storage' } })
      return res.data
    } catch (err) {
      console.error(err)
      return undefined
    }
  }


  async createPageContent(bodyData: any): Promise<any> {
    try {
      const res = await this.axiosCli.post(`/api/v2/pages`, bodyData)
      return res.data
    } catch (err) {
      console.error(err)
      return undefined
    }
  }

  async getChildren(pageId: string): Promise<any> {
    try {
      const res = await this.axiosCli.get(`/rest/api/content/${pageId}/descendant`, {
        params: {
          expand: 'page',
        },
      })
      return res.data
    } catch (err) {
      console.error(err)
      return undefined
    }
  }

  async getTaskStatus(taskId: string): Promise<any> {
    try {
      const res = await this.axiosCli.get(`/rest/api/longtask/${taskId}`)
      return res.data
    } catch (err) {
      console.error(err)
      return undefined
    }
  }

  async deletePage(pageId: string): Promise<any> {
    try {
      const res = await this.axiosCli.delete(`/rest/api/content/${pageId}`)
      return res
    } catch (err) {
      console.error(err)
      return undefined
    }
  }
}

export default ConfluenceClient
