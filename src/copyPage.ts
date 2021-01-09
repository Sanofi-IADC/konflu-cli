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
  ]
  return inquirer.prompt(qs)
}

const copyPage = async (): Promise<void> => {
  console.log(chalk.green('\nCopying Confluence page...'))
  const answers = await queryParams()
  const { sourcePageId, targetPageId, options, confirm } = answers

  const copyOptions: any = {}
  options.forEach((option: string) => {
    copyOptions[option] = true
  })

  if (confirm) {
    const { Spinner } = clui
    const spinner = new Spinner(
      `Copying page hierarchy from ${sourcePageId} to ${targetPageId}...`
    )
    spinner.start()
    const confluenceclient = new ConfluenceClient()
    const task = await confluenceclient.copyPageHierarchy(
      sourcePageId,
      targetPageId,
      copyOptions
    )
    if (task) {
      let status: Record<string, never>
      do {
        status = await confluenceclient.getTaskStatus(task.id)
        await wait(500)
      } while (!status.finished)
      spinner.stop()
      successMsg(
        `Done! Page hierarchy copied from ${sourcePageId} to ${targetPageId}.\n\n`
      )
    }
  } else {
    successMsg('See you soon!\n\n')
  }
}

export default copyPage
