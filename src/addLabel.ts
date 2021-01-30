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
      name: 'children',
      type: 'confirm',
      message: 'Do you want to add the label to all its children too?',
    },
    {
      name: 'confirm',
      type: 'confirm',
      message: 'Do you want to add the new label?',
    },
  ]
  return inquirer.prompt(qs)
}

const addLabel = async (): Promise<void> => {
  console.log(chalk.green('\n Adding a label to a Confluence page...'))
  const answers = await queryParams()
  const { pageId, label, children, confirm } = answers
  // console.log('Params are %s and %s', pageId, label)
  if (confirm) {
    const SpinnerStatus = clui.Spinner
    const spinner = new SpinnerStatus(
      `Adding label ${label} to the page with ID ${pageId}...`
    )
    spinner.start()
    const confluenceclient = new ConfluenceClient()
    const addLabelParent = await confluenceclient.addLabel(pageId, label)
    if (addLabelParent.status === 200) {
      spinner.message(`Label ${label} added to page with ID ${pageId}      `)
    }
    if (children) {
      const childrenPages: string[] = []
      const res = await confluenceclient.getChildren(pageId)
      res.page.results.map(async (page: any) => {
        childrenPages.push(page.id)
      })
      // eslint-disable-next-line no-restricted-syntax
      for (const childPageId of childrenPages) {
        const addLabelChild = await confluenceclient.addLabel(childPageId, label)
        if (addLabelChild.status === 200) {
          spinner.message(`Label ${label} added to page with ID ${childPageId}          `)
        } else {
          spinner.message(
            `Label ${label} failed to be added to page with ID ${childPageId}           `
          )
        }
        await wait(500)
      }
      // spinner.message(`Pages ${deletePages} to be deleted.`)
    }
    spinner.stop()
    successMsg(`Done! Label ${label} added to pages`)
  } else {
    successMsg('See you soon!')
  }
}

export default addLabel
