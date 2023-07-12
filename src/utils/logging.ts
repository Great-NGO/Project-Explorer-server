const LCERROR = "\x1b[31m%s\x1b[0m"; //red
const LCWARN = "\x1b[33m%sx1b[0m"; //yellow
const LCINFO = "\x1b[36m%s\x1b[0m"; //cyan
const LCSUCCESS = "\x1b[32m%s\x1b[0m"; //green

const logger = class {
  static error(message:string, ...optionalParams:any) {
    console.error(LCERROR, message, ...optionalParams);
  }
  static warn(message:string, ...optionalParams:any) {
    console.warn(LCWARN, message, ...optionalParams);
  }
  static info(message:string, ...optionalParams:any) {
    console.info(LCINFO, message, ...optionalParams);
  }
  static log(message:string, ...optionalParams:any) {
    console.info(message, ...optionalParams);
  }
  static success(message:string, ...optionalParams:any) {
    console.info(LCSUCCESS, message, ...optionalParams);
  }
};

const getTimeStamp = () => {
  return new Date().toISOString();
};

const log = ( message:string, object:any) => {
  if (object) {
    logger.info(`[${getTimeStamp()}] [INFO] ${message}`, object);
  } else {
    logger.info(`[${getTimeStamp()}] [INFO] ${message}`);
  }
};

const logInfo = ( message:string, object:any) => {
  if (object) {
    logger.info(`[${getTimeStamp()}] [INFO] ${message}`, object);
  } else {
    logger.info(`[${getTimeStamp()}] [INFO] ${message}`);
  }
};

const success = ( message:string, object:any) => {
  if (object) {
    logger.success(`[${getTimeStamp()}] [INFO] ${message}`, object);
  } else {
    logger.success(`[${getTimeStamp()}] [INFO] ${message}`);
  }
};

const warn = ( message:string, object:any) => {
  if (object) {
    logger.warn(`[${getTimeStamp()}] [WARN] ${message}`, object);
  } else {
    logger.warn(`[${getTimeStamp()}] [WARN] ${message}`);
  }
};

const debug = ( message:string, object:any) => {
  if (object) {
    logger.log(`[${getTimeStamp()}] [DEBUG] ${message}`, object);
  } else {
    logger.log(`[${getTimeStamp()}] [DEBUG] ${message}`);
  }
};

const logError = ( message:string, object:any) => {
  if (object) {
    logger.error(`[${getTimeStamp()}] [ERROR] ${message}`, object);
  } else {
    logger.error(`[${getTimeStamp()}] [ERROR] ${message}`);
  }
};

export {
    log,
    logInfo,
    success,
    warn,
    debug,
    logError,

}