import fs from 'fs';
import { IEmailSenderClient } from 'interfaces';
import { TEMPLATE_NAME_TO_FILE_MAPPER, TemplateNames } from 'settings';
import { AppLogger } from 'utils/logger';

const logger = new AppLogger('SendTemplateEmail');
export class SendTemplateEmail {
  constructor(private emailClient: IEmailSenderClient) {}

  async execute(templateName: TemplateNames, recipients: string[]) {
    const folderName = TEMPLATE_NAME_TO_FILE_MAPPER[templateName];

    const json = fs.readFileSync(
      `src/email-templates/${folderName}/testVariables.json`,
      'utf-8'
    );

    const templateData = JSON.parse(json);

    if (!('subject' in templateData)) {
      logger.warn('There is no "subject" in your testVariables...');
      logger.warn(
        'Templates created with this tool require a "subject" to be specified'
      );
      logger.warn(
        'This might be oversight and SES might ignore sent.'
      );
    }
    await this.emailClient.send({
      templateName: templateName,
      templateData,
      toAddresses: recipients,
    });

    logger.info('Eamil sent successfully', { templateData, templateName });
  }
}
