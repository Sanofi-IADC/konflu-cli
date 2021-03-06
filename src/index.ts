#! /usr/bin/env node

import clear from 'clear'
import program from 'commander'
import inquirer from 'inquirer'
import showIntro from './intro'
import login from './login'
import copyPage from './copyPage'
import getPage from './getPage'
import addLabel from './addLabel'
import deletePages from './deletePages'
import deleteChildren from './deleteChildren'

const queryParams = () => {
  const qs = [
    {
      name: 'what',
      type: 'list',
      message: 'What do you want to do?',
      choices: [
        'Login to Confluence API',
        'Copy Page Hierarchy',
        // 'Copy Permissions',
        // 'Get Page',
        'Add Label',
        'Delete Pages',
        'Delete Children',
        'Exit',
      ],
    },
  ]
  return inquirer.prompt(qs)
}

// program
//   .version('1.0.0')
//   .description('Konflu-cli give you Martial Arts for Confluence')
//   .option('-p, --parent', 'Parent ID')
//   .option('-c, --pages', 'List of pages IDs')
//   .parse(process.argv)

const run = async () => {
  clear()
  // show Konflu introduction
  showIntro()
  // ask questions
  const { what } = await queryParams()
  console.log('Going to %s', what)

  switch (what) {
    case 'Login to Confluence API':
      // configure Confluence credentials and save defaults in Configstore
      login()
      break
    case 'Copy Page Hierarchy':
      // execute API call
      copyPage()
      break
    case 'Copy Permissions':
      break
    case 'Get Page':
      // get the content of a page from Confluence
      getPage()
      break
    case 'Add Label':
      // add a new label to a Confluence page
      addLabel()
      break
    case 'Delete Pages':
      // delete a list of pages from Confluence
      deletePages()
      break
    case 'Delete Children':
      // delete a list of pages from Confluence
      deleteChildren()
      break
    default:
      console.log('Thanks for using Konflu!')
  }

  // show success message
}

run()
