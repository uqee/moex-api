import { isFunction } from '../../utils'
import { Env } from '../Env'
import { LogArguments, LogCallback, LogLevel, LogMessage } from './types'

export class Logger {
  public LogLevel: typeof LogLevel = LogLevel
  public logLevel: number

  public constructor(env: Env) {
    this.logLevel = +env.LOG_LEVEL
  }

  //

  public debug(...logArguments: LogArguments): void {
    return this.log(LogLevel._4__DEBUG, logArguments)
  }

  public error(...logArguments: LogArguments): void {
    return this.log(LogLevel._1__ERROR, logArguments)
  }

  public info(...logArguments: LogArguments): void {
    return this.log(LogLevel._3__INFO, logArguments)
  }

  public trace(...logArguments: LogArguments): void {
    return this.log(LogLevel._5__TRACE, logArguments)
  }

  public warning(...logArguments: LogArguments): void {
    return this.log(LogLevel._2__WARNING, logArguments)
  }

  //

  private static toLogMessages(logArguments: LogArguments): LogMessage[] {
    return logArguments.map(
      (logCallbackOrLogMessage: LogCallback | LogMessage): LogMessage => {
        return isFunction(logCallbackOrLogMessage)
          ? logCallbackOrLogMessage()
          : logCallbackOrLogMessage
      },
    )
  }

  private log(logLevel: LogLevel, logArguments: LogArguments): void {
    if (+logLevel <= this.logLevel) {
      switch (logLevel) {
        case LogLevel._1__ERROR:
          return console.error(...Logger.toLogMessages(logArguments))
        case LogLevel._2__WARNING:
          return console.warn(...Logger.toLogMessages(logArguments))
        case LogLevel._3__INFO:
          return console.info(...Logger.toLogMessages(logArguments))
        case LogLevel._4__DEBUG:
          return console.debug(...Logger.toLogMessages(logArguments))
        case LogLevel._5__TRACE:
          return console.log(...Logger.toLogMessages(logArguments))
        default:
          return console.log(...Logger.toLogMessages(logArguments))
      }
    }
    return undefined
  }
}
