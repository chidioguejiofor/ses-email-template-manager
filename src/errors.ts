class BaseError extends Error {}

export class InvalidTemplateName extends BaseError {}
export class CreateTemplateFailed extends BaseError {}
export class UpdateTemplateFailed extends BaseError {}
