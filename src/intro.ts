import chalk from 'chalk'
import figlet from 'figlet'

// export default (): void => {
const showIntro = (): void => {
  console.log(
    chalk.green(figlet.textSync('Konflu-cli', { font: 'Doom', horizontalLayout: 'full' }))
  )
}

export default showIntro
