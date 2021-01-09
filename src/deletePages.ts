/* eslint-disable no-await-in-loop */
import inquirer from 'inquirer'
import chalk from 'chalk'
import clui from 'clui'
import ConfluenceClient from './confluenceAPI'
import { successMsg, wait } from './helpers'

// Questions to get the parameters to copy the page hierarchy
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
  ]
  return inquirer.prompt(qs)
}

const deletePages = async (): Promise<void> => {
  console.log(chalk.green('\nDeleting Confluence pages...'))
  const answers = await queryParams()
  const { pages, confirm } = answers
  if (confirm) {
    const SpinnerStatus = clui.Spinner
    const spinner = new SpinnerStatus(`Deleting pages...`)
    spinner.start()
    const pagesIds = pages.replace(/\s/g, '').split(',')
    const confluenceclient = new ConfluenceClient()
    const deletedPages = []
    // eslint-disable-next-line no-restricted-syntax
    for (const pageId of pagesIds) {
      const res = await confluenceclient.deletePage(pageId)
      if (res.status === 204) {
        spinner.message(`Page ${pageId} deleted with status ${res.status}`)
        deletedPages.push(pageId)
      } else {
        spinner.message(`Page ${pageId} not deleted with status ${res.status}`)
      }
      await wait(500)
    }
    spinner.stop()
    successMsg(`Done! Pages ${deletedPages} deleted.\n\n`)
  } else {
    successMsg('See you soon!\n\n')
  }
}

export default deletePages
