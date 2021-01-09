import inquirer from 'inquirer'
import chalk from 'chalk'
import validator from 'validator'
import config from './config'

// Questions to get the parameters to copy the page hierarchy
const queryParams = () => {
  const qs = [
    {
      name: 'url',
      type: 'input',
      message: 'Enter your Atlassian URL base address:',
      default: 'https://iadc.atlassian.net',
      validate: (value: string) =>
        validator.isURL(value) ? true : 'Please enter a proper URL.',
    },
    {
      name: 'username',
      type: 'input',
      message: 'Enter your Confluence e-mail address:',
      validate: (value: string) =>
        validator.isEmail(value) ? true : 'Please enter your e-mail address.',
    },
    {
      name: 'tokenAPI',
      type: 'password',
      message: 'Enter your API token:',
      validate: (value: string) => (value.length ? true : 'Please enter your API key.'),
    },
  ]
  return inquirer.prompt(qs)
}

const successMsg = () => {
  console.log(chalk.grey.bgGreen.bold(` Done! Login credentials saved `))
}

const login = async (): Promise<void> => {
  console.log(chalk.green('\nGetting Confluence credentials...'))
  const answers = await queryParams()
  const { url, username, tokenAPI } = answers
  config.set('confluence.url', url)
  config.set('confluence.username', username)
  config.set('confluence.tokenAPI', tokenAPI)
  console.log('Params are %s, %s and %s', url, username, tokenAPI)
  successMsg()
}

export default login
