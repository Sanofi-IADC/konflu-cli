import inquirer from 'inquirer'
import chalk from 'chalk'
import ConfluenceClient from './confluenceAPI'

// Questions to get the parameters to copy the page hierarchy
const queryParams = () => {
  const qs = [
    {
      name: 'pageId',
      type: 'number',
      message: 'Write the ID of the page to retrieve',
    },
  ]
  return inquirer.prompt(qs)
}

const successMsg = (msg: string) => {
  console.log(chalk.grey.bgGreen.bold(msg))
}

const getPage = async (): Promise<void> => {
  console.log(chalk.green('\nFetching Confluence page...'))
  const answers = await queryParams()
  const { pageId } = answers
  console.log('Page ID %s ', pageId)
  const confluenceclient = new ConfluenceClient()
  const page = await confluenceclient.getPageContent(pageId)
  console.log('Page Content is... \n ', page)
  successMsg(`Done! Page content fetched from ${pageId}`)
}

export default getPage
