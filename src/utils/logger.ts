import winston from 'winston';

const { createLogger: _createLogger, format, transports } = winston;

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const logger = _createLogger({
  format: format.combine(
    format.colorize({
      all: true,
      colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'green',
      },
    }),
    format.label({
      label: '[LOGGER]',
    }),
    format.timestamp({
      format: 'YY-MM-DD HH:mm:ss',
    }),
    format.printf(
      (info) =>
        ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
    ),
    format.errors({ stack: true })
  ),
  transports: [new transports.Console({ handleExceptions: true })],
  silent: process.env.NODE_ENV === 'test',
});

export class AppLogger {
  constructor(private name: string) {}

  public info(msg: string, extra?: Record<string, unknown>) {
    logger.info(msg, {
      ...extra,
      service: this.name,
    });
  }

  public error(msg: any, extra?: Record<string, unknown>) {
    logger.error(msg, {
      ...extra,
      service: this.name,
    });
  }

  public warn(msg: string, extra?: Record<string, unknown>) {
    logger.warn(msg, {
      service: this.name,
      ...extra,
    });
  }

  public debug(msg: string, extra?: Record<string, unknown>) {
    logger.debug(msg, {
      service: this.name,
      ...extra,
    });
  }

  public static createLogger(moduleName: string) {
    const logger = new AppLogger(moduleName);
    return logger;
  }
}
