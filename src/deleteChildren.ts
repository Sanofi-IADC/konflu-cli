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
  ]
  return inquirer.prompt(qs)
}

const deleteChildren = async (): Promise<void> => {
  console.log(chalk.green('\nDeleting Confluence pages...'))
  const answers = await queryParams()
  const { parent, includeParent, confirm } = answers
  if (confirm) {
    const SpinnerStatus = clui.Spinner
    const spinner = new SpinnerStatus(
      `Retrieving children from parent page with ID ${parent}...`
    )
    spinner.start()
    const confluenceclient = new ConfluenceClient()
    const deletePages: string[] = []
    const res = await confluenceclient.getChildren(parent)
    res.page.results.map(async (page: any) => {
      deletePages.push(page.id)
    })
    spinner.message(`Pages ${deletePages} to be deleted.`)

    // const pagesIds = pages.replace(/\s/g, '').split(',')
    const deletedPages: string[] = []
    // eslint-disable-next-line no-restricted-syntax
    for (const pageId of deletePages) {
      const del = await confluenceclient.deletePage(pageId)
      if (del.status === 204) {
        spinner.message(
          `Page ${pageId} deleted with status ${del.status}                               `
        )
        deletedPages.push(pageId)
      } else {
        spinner.message(
          `Page ${pageId} not deleted with status ${del.status}                           `
        )
      }
      await wait(500)
    }
    if (includeParent) {
      const del = await confluenceclient.deletePage(parent)
      if (del.status === 204) {
        spinner.message(`Page ${parent} deleted with status ${del.status}`)
        deletedPages.push(parent)
      } else {
        spinner.message(`Page ${parent} not deleted with status ${del.status}`)
      }
    }
    spinner.stop()
    successMsg(`Done! Pages ${deletedPages} deleted.\n\n`)
  } else {
    successMsg('See you soon!\n\n')
  }
}

export default deleteChildren
