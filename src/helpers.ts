import chalk from 'chalk'

const successMsg = (msg: string): void => {
  console.log(chalk.grey.bgGreen.bold(msg))
}

const wait = async (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

export { successMsg, wait }
