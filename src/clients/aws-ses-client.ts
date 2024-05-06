import {
  CreateTemplateCommand,
  GetTemplateCommand,
  SESClient,
  SendTemplatedEmailCommand,
  UpdateTemplateCommand,
} from '@aws-sdk/client-ses';
import { AWS_API_KEY, AWS_SECRET_KEY, AWS_REGION, SES_SOURCE } from 'settings';
import {
  IEmailSenderClient,
  SendEmailInput,
  UpdateCreateHtmlInput,
} from 'interfaces';
import { AppLogger } from 'utils/logger';
import { CreateTemplateFailed, UpdateTemplateFailed } from 'errors';

const logger = new AppLogger('AwsSESClient');
let ses = new SESClient({
  region: AWS_REGION,
});

if (AWS_API_KEY && AWS_SECRET_KEY) {
  ses = new SESClient({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_API_KEY,
      secretAccessKey: AWS_SECRET_KEY,
    },
  });
}

class AwsSESClient implements IEmailSenderClient {
  async send(input: SendEmailInput) {
    try {
      const sendParams = {
        Source: SES_SOURCE,
        Template: input.templateName,
        Destination: {
          ToAddresses: input.toAddresses,
        },
        TemplateData: JSON.stringify(input.templateData),
      };

      const command = new SendTemplatedEmailCommand(sendParams);
      const data = await ses.send(command);

      logger.info('Successfully sent email...', { data });
      return data;
    } catch (error) {
      logger.error('Error while sending email...', { error });
      return;
    }
  }

  async templateExists(templateName: string) {
    try {
      const inputParams = {
        TemplateName: templateName,
      };
      const command = new GetTemplateCommand(inputParams);
      await ses.send(command);

      return true;
    } catch (error) {
      logger.error('Error while retrieving email template...', { error });
      return false;
    }
  }

  async createTemplate(templateName: string, input: UpdateCreateHtmlInput) {
    try {
      const { html, text } = input;
      const command = new CreateTemplateCommand({
        Template: {
          TemplateName: templateName,
          HtmlPart: html,
          TextPart: text,
          SubjectPart: '{{subject}}',
        },
      });
      await ses.send(command);
    } catch (error) {
      logger.error('Error while creating email template...', { error });
      throw new CreateTemplateFailed();
    }
  }

  async updateTemplate(templateName: string, input: UpdateCreateHtmlInput) {
    try {
      const { html, text } = input;
      const command = new UpdateTemplateCommand({
        Template: {
          TemplateName: templateName,
          HtmlPart: html,
          TextPart: text,
          SubjectPart: '{{subject}}',
        },
      });
      await ses.send(command);
    } catch (error) {
      logger.error('Error while updating email template...', { error });
      throw new UpdateTemplateFailed();
    }
  }
}

export const awsSesClient = new AwsSESClient();
export { ses };
