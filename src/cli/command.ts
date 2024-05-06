import prompts from 'prompts';
import { TEMPLATE_NAME_TO_FILE_MAPPER } from 'settings';
import { createOrUpdateTemplate, sendEmail } from 'usecases';

async function askWhatActionYouWantToPerform() {
  return await prompts([
    {
      type: 'select',
      name: 'action',
      message: 'What action would you like to perform',
      choices: [
        {
          title: 'Create Or Update Template',
          value: 'create_or_update_template',
        },
        { title: 'Send Test Email', value: 'send_test_email' },
        { title: 'Exit', value: 'exit_program' },
      ],
      initial: 1,
    },
    {
      type: (prev) => (prev !== 'exit_program' ? 'select' : null),
      name: 'templateName',
      message: 'Choose the template name',
      choices: Object.keys(TEMPLATE_NAME_TO_FILE_MAPPER).map((option) => ({
        title: option,
        value: option,
      })),
    },
  ]);
}

async function startupCliTool() {
  let currentAction = '';
  while (currentAction !== 'exit_program') {
    const { templateName, action } = await askWhatActionYouWantToPerform();

    currentAction = action;

    if (action === 'create_or_update_template') {
      await createOrUpdateTemplate.execute(templateName);
    }
    if (action === 'send_test_email') {
      const { recipients } = await prompts({
        type: 'text',
        name: 'recipients',
        message: 'Please enter the recipient emails',
      });

      const emails = recipients.split(',');
      await sendEmail.execute(templateName, emails);
    }
  }
}

startupCliTool();
