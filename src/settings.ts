export const AWS_API_KEY = process.env.AWS_API_KEY as string;
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY as string;
export const AWS_REGION = process.env.AWS_REGION as string;
export const SES_SOURCE = process.env.SES_SOURCE || '';

export const TEMPLATE_NAME_TO_FILE_MAPPER = {
  ExampleTemplate: 'first-example',
};

export type TemplateNames = keyof typeof TEMPLATE_NAME_TO_FILE_MAPPER;
