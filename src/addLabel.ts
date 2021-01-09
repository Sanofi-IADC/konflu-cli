import inquirer from 'inquirer'
import chalk from 'chalk'
import ConfluenceClient from './confluenceAPI'

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
      name: 'confirm',
      type: 'confirm',
      message: 'Do you want to add the new label?',
    },
  ]
  return inquirer.prompt(qs)
}

const successMsg = (msg: string) => {
  console.log(chalk.grey.bgGreen.bold(msg))
}

const addLabel = async (): Promise<void> => {
  console.log(chalk.green('\n Adding a label to a Confluence page...'))
  const answers = await queryParams()
  const { pageId, label, confirm } = answers
  console.log('Params are %s and %s', pageId, label)
  if (confirm) {
    const confluenceclient = new ConfluenceClient()
    await confluenceclient.addLabel(pageId, label)
    successMsg(`Done! Label ${label} add to page ${pageId}`)
  } else {
    successMsg('See you soon!')
  }
}

export default addLabel
