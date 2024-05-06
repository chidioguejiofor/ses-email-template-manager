import { awsSesClient } from 'clients';
import { CreateOrUpdateTemplate } from './create-or-update-template';
import { SendTemplateEmail } from './send-template-email';

export const createOrUpdateTemplate = new CreateOrUpdateTemplate(awsSesClient);
export const sendEmail = new SendTemplateEmail(awsSesClient);
