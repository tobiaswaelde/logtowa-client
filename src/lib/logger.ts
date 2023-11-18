import { LogTowaClientOptions } from '../types/options';
import { LogLevel } from '../types/log-level';
import { LogMessage } from '../types/log-message';
import { ConsoleLogger } from './console-logger';
import { CloudLogger } from './cloud-logger';

export class LogTowaClient {
	private cloudLogger?: CloudLogger;
	private consoleLogger?: ConsoleLogger;

	/** The current scope; set using `.scope()`. */
	private currentScope: string | null = null;
	/** A temporary scope for the next message; set using `.scoped()`. */
	private tmpScope: string | null = null;

	constructor(private readonly options: LogTowaClientOptions) {
		// initialize console logger
		if (options.console) {
			this.consoleLogger = new ConsoleLogger(options.console);
		}

		// initialize cloud logger
		if (options.cloud) {
			this.cloudLogger = new CloudLogger(options.cloud);
		}
	}

	/**
	 * Sets a scope for all following messages.
	 * @param {string} scope The scope to apply.
	 */
	public scope(scope: string) {
		this.currentScope = scope;
	}

	/**
	 * Resets the current scope.
	 */
	public unscope() {
		this.currentScope = null;
	}

	/**
	 * Applies a scope to the next message. This will also overwrite the current scope set using `.scope()`.
	 *
	 * This function can be daisy chained.
	 * @example ```ts
	 * logger.scoped('db').error('Database connection failed.');
	 * ```
	 * @param scope The scope to apply.
	 * @returns The current instance with the scope set for the next message.
	 */
	public scoped(scope: string) {
		this.tmpScope = scope;
		return this;
	}

	/**
	 * Resets the temporary scope. Should be called after sending a log message.
	 */
	private resetScope() {
		this.tmpScope = null;
	}

	/**
	 * Log message to all configured channels.
	 * @param level The minimum required level to log the message.
	 * @param message The message to log.
	 * @param meta Meta data of the message. (Can also contain a scope for the message. The meta scope will overwrite all other given scopes.)
	 */
	public log(
		level: keyof typeof LogLevel,
		message: string,
		meta?: { scope?: string; [key: string]: any }
	) {
		if (this.options.level && LogLevel[level] > LogLevel[this.options.level]) {
			return;
		}

		// get the current scope to use
		const scope =
			meta && 'scope' in meta && typeof meta.scope === 'string'
				? meta.scope
				: this.tmpScope ?? this.currentScope;
		const { scope: removedScope, ...remainingMeta } = meta ?? {};

		// prepare meta
		const metadata = Object.keys(remainingMeta).length > 0 ? remainingMeta : null;

		// prepare the log message
		const msg: LogMessage = {
			scope: scope,
			level: level,
			message: message,
			meta: metadata,
		};

		// log message to configured channels
		if (this.options.cloud?.enabled) {
			this.cloudLogger?.log({ ...msg, appKey: this.options.cloud.appKey });
		}
		if (this.options.console?.enabled) {
			this.consoleLogger?.log(msg);
		}

		this.resetScope();
	}

	//#region levels log methods
	/**
	 * Logs an `error` message.
	 * @param {string} message The message.
	 * @param {object} meta The meta data of the message.
	 */
	public error(message: string, meta?: object) {
		this.log('error', message, meta);
	}
	/**
	 * Logs a `warn` message.
	 * @param {string} message The message.
	 * @param {object} meta The meta data of the message.
	 */
	public warn(message: string, meta?: object) {
		this.log('warn', message, meta);
	}

	/**
	 * Logs an `info` message.
	 * @param {string} message The message.
	 * @param {object} meta The meta data of the message.
	 */
	public info(message: string, meta?: object) {
		this.log('info', message, meta);
	}

	/**
	 * Logs a `success` message.
	 * @param {string} message The message.
	 * @param {object} meta The meta data of the message.
	 */
	public success(message: string, meta?: object) {
		this.log('success', message, meta);
	}

	/**
	 * Logs a `http` message.
	 * @param {string} message The message.
	 * @param {object} meta The meta data of the message.
	 */
	public http(message: string, meta?: object) {
		this.log('http', message, meta);
	}

	/**
	 * Logs a `verbose` message.
	 * @param {string} message The message.
	 * @param {object} meta The meta data of the message.
	 */
	public verbose(message: string, meta?: object) {
		this.log('verbose', message, meta);
	}

	/**
	 * Logs a `debug` message.
	 * @param {string} message The message.
	 * @param {object} meta The meta data of the message.
	 */
	public debug(message: string, meta?: object) {
		this.log('debug', message, meta);
	}

	/**
	 * Logs a `db` message.
	 * @param {string} message The message.
	 * @param {object} meta The meta data of the message.
	 */
	public db(message: string, meta?: object) {
		this.log('db', message, meta);
	}

	/**
	 * Logs a `silly` message.
	 * @param {string} message The message.
	 * @param {object} meta The meta data of the message.
	 */
	public silly(message: string, meta?: object) {
		this.log('silly', message, meta);
	}
	//#endregion
}
