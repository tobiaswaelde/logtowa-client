import { LogTowaClientOptions } from '../types/options';
import { LogLevel } from '../types/log-level';
import { LogMessage } from '../types/log-message';
import { ConsoleLogger } from './console-logger';
import { CloudLogger } from './cloud-logger';

export class LogTowaClient {
	private cloudLogger?: CloudLogger;
	private consoleLogger?: ConsoleLogger;

	private currentScope: string | null = null;
	private tmpScope: string | null = null;

	constructor(private readonly options: LogTowaClientOptions) {
		if (options.console) {
			this.consoleLogger = new ConsoleLogger(options.console);
		}

		if (options.cloud) {
			this.cloudLogger = new CloudLogger(options.cloud);
		}
	}

	public scope(scope: string) {
		this.currentScope = scope;
	}
	public unscope() {
		this.currentScope = null;
	}

	public scoped(scope: string) {
		this.tmpScope = scope;
		return this;
	}

	public log(level: LogLevel, message: string, meta?: object) {
		const scope =
			meta && 'scope' in meta && typeof meta.scope === 'string'
				? meta.scope
				: this.tmpScope ?? this.currentScope;

		const msg: LogMessage = {
			scope: scope,
			level: level,
			message: message,
			meta: meta,
		};

		if (this.options.cloud?.enabled) {
			this.cloudLogger?.log({ ...msg, appKey: this.options.cloud.appKey });
		}
		if (this.options.console?.enabled) {
			this.consoleLogger?.log(msg);
		}

		this.tmpScope = null;
	}

	public error(message: string, meta?: object) {
		this.log('error', message, meta);
	}
	public warn(message: string, meta?: object) {
		this.log('warn', message, meta);
	}
	public info(message: string, meta?: object) {
		this.log('info', message, meta);
	}
	public success(message: string, meta?: object) {
		this.log('success', message, meta);
	}
	public http(message: string, meta?: object) {
		this.log('http', message, meta);
	}
	public verbose(message: string, meta?: object) {
		this.log('verbose', message, meta);
	}
	public debug(message: string, meta?: object) {
		this.log('debug', message, meta);
	}
	public db(message: string, meta?: object) {
		this.log('db', message, meta);
	}
	public silly(message: string, meta?: object) {
		this.log('silly', message, meta);
	}
}
