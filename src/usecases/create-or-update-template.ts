import fs from 'fs';
import { InvalidTemplateName } from 'errors';
import { IEmailSenderClient } from 'interfaces';
import { TEMPLATE_NAME_TO_FILE_MAPPER, TemplateNames } from 'settings';
import { AppLogger } from 'utils/logger';

const logger = new AppLogger('CreateOrUpdateTemplate');
export class CreateOrUpdateTemplate {
  constructor(private emailClient: IEmailSenderClient) {}

  async execute(templateName: TemplateNames) {
    if (!(templateName in TEMPLATE_NAME_TO_FILE_MAPPER))
      throw new InvalidTemplateName();
    const folderName = TEMPLATE_NAME_TO_FILE_MAPPER[templateName];
    const html = fs.readFileSync(
      `src/email-templates/${folderName}/main.html`,
      'utf-8'
    );

    const text = fs.readFileSync(
      `src/email-templates/${folderName}/main.txt`,
      'utf-8'
    );

    const templateExists = await this.emailClient.templateExists(templateName);

    if (templateExists) {
      await this.emailClient.updateTemplate(templateName, { html, text });
      logger.info('Updated template', { templateName });
    } else {
      await this.emailClient.createTemplate(templateName, { html, text });
      logger.info('New template created!', { templateName });
    }
  }
}
