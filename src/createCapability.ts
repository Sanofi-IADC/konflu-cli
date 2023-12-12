/* eslint-disable no-await-in-loop */
// import inquirer from 'inquirer'
import chalk from 'chalk'
import clui from 'clui'
import ConfluenceClient from './confluenceAPI'
import { successMsg } from './helpers'

const createCapability = async (spaceId: string, parentId: string, title: string, capability: string, stream: string): Promise<void> => {
  console.log(chalk.green('\nCreating Capability...'))

  const bodyData = {
    "spaceId": spaceId,
    "status": "current",
    "title": title,
    "parentId": parentId,
    "body": {
      "representation": "storage",
      "value": `<h1>Overview and strategy</h1>
        <ac:structured-macro ac:name="excerpt" ac:schema-version="1" data-layout="default"
          ac:local-id="84567b92-408a-4462-ad02-e074ce9843a7" ac:macro-id="eaebf2ae23388f1665a13fc34ea6d888">
          <ac:parameter ac:name="name">excerpt-capability-overview</ac:parameter><ac:rich-text-body>
            <p>Provide a brief introduction to the capability and the strategy to align with overall business objectives.</p>
            <p>Identify how the specific business capability supports or aligns with broader business goals and objectives.</p>
            <p>Define how the business capability provides a <strong>competitive advantage</strong>. This could involve leveraging unique strengths, optimizing processes, or delivering products/services in a way that distinguishes the organization from its competitors.</p>
            <p>Specify how the business capability will drive <strong>innovation</strong> and continuous improvement. This could involve adopting new technologies, optimizing processes, or exploring new market opportunities.</p>
          </ac:rich-text-body>
        </ac:structured-macro>
        <h1>Key processes</h1>
        <p><ac:placeholder>Describe the main processes covered by this capability.</ac:placeholder></p>
        <p><ac:placeholder>This is a functional specification describing the interfaces between the different components, including data model definitions and data management and security ore regulations requirements.</ac:placeholder></p>
        <h2>Process one</h2>
        <p><ac:placeholder>The [Process Name] is a systematic series of activities designed to [achieve a specific outcome orgoal]. This process involves [brief overview of major steps or tasks], with the ultimate aim of [delivering a particular result or contributing to a broader objective].</ac:placeholder></p>
        <h2>Process two</h2>
        <p><ac:placeholder>The [Process Name] is a systematic series of activities designed to [achieve a specific outcome orgoal]. This process involves [brief overview of major steps or tasks], with the ultimate aim of [delivering aparticular result or contributing to a broader objective].</ac:placeholder></p>
        <h1>Owners</h1>
        <ul>
          <li><p>Business Process Owner</p></li>
          <li><p>Digital Product Owner</p></li>
        </ul>
        <h1>Applications</h1>
        <p><ac:placeholder>The list of applications is automatically retrieved by the macro below, which shall select the appropriate capability via the label filter.</ac:placeholder></p>
        <ac:structured-macro ac:name="excerpt" ac:schema-version="1" data-layout="default"
          ac:local-id="0b9be5a4-81f4-45f4-b24c-2e7d4042c798" ac:macro-id="acc23b5bc614c3afb554966b7e04c932">
          <ac:parameter ac:name="name">excerpt-applications-description</ac:parameter><ac:rich-text-body><ac:structured-macro
              ac:name="contentbylabel" ac:schema-version="4" data-layout="default"
              ac:macro-id="378d1f4a-8b1b-4a45-b36e-4cb2b1d642cd">
              <ac:parameter ac:name="cql">label = &quot;${capability}&quot; and ancestor =&quot;64075310471&quot;</ac:parameter>
              <ac:parameter ac:name="showLabels">false</ac:parameter>
              <ac:parameter ac:name="max">99</ac:parameter>
              <ac:parameter ac:name="showSpace">false</ac:parameter>
              <ac:parameter ac:name="excerptType">simple</ac:parameter>
            </ac:structured-macro></ac:rich-text-body>
        </ac:structured-macro><ac:structured-macro ac:name="excerpt" ac:schema-version="1" data-layout="default"
          ac:local-id="7f9c7f81-552f-4cea-9cad-8bd41f2e01ec" ac:macro-id="b08a787bbea6ec40fc3a75d325c8e177">
          <ac:parameter ac:name="hidden">true</ac:parameter>
          <ac:parameter ac:name="name">excerpt-applications-list</ac:parameter><ac:rich-text-body><ac:structured-macro
              ac:name="contentbylabel" ac:schema-version="4" data-layout="default"
              ac:local-id="f123ee9a-6e69-4ea3-994a-4253237edeb0" ac:macro-id="b9a5ea33-8dc0-458b-b3aa-13b9d1c104c9">
              <ac:parameter ac:name="showLabels">false</ac:parameter>
              <ac:parameter ac:name="max">99</ac:parameter>
              <ac:parameter ac:name="showSpace">false</ac:parameter>
              <ac:parameter ac:name="cql">label = &quot;${capability}&quot; and ancestor =&quot;64075310471&quot;</ac:parameter>
            </ac:structured-macro></ac:rich-text-body>
        </ac:structured-macro>
        <h1>Dependencies</h1>
        <p><ac:placeholder>Links to dependencies on other internal capabilities or resources or dependencies on external factors, technologies, or partners.</ac:placeholder></p>
        <hr />`
    }
  };

  // console.log(bodyData);

  const { Spinner } = clui
  const spinner = new Spinner(
    `Creating capability ${title} in Space ${spaceId}...`
  )
  spinner.start()
  const confluenceclient = new ConfluenceClient()
  const page = await confluenceclient.createPageContent(bodyData)
  // console.log('\nCapability created in page... \n ', page)
  const newLabel = await confluenceclient.addLabel(page.id, stream)
  spinner.stop()
  successMsg(`Done! Capability ${title} created in ${page.id} with label ${newLabel.results[0].name}`)
}

export default createCapability
