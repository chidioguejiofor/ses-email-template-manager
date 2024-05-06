export type SendEmailInput = {
  toAddresses: string[];
  templateName: string;
  subject?: string;
  templateData: object;
};

export type UpdateCreateHtmlInput = {
  html: string;
  text: string;
};
export interface IEmailSenderClient {
  send: (input: SendEmailInput) => void;
  templateExists: (templateName: string) => Promise<boolean>;
  createTemplate: (
    templateName: string,
    input: UpdateCreateHtmlInput
  ) => Promise<void>;
  updateTemplate: (
    templateName: string,
    input: UpdateCreateHtmlInput
  ) => Promise<void>;
}
