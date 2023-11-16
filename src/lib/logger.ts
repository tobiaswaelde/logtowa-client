import { Socket, io } from 'socket.io-client';
import { LogTowaOptions } from '../types/options';
import { LogLevel } from '../types/log-level';
import { LogMessage } from '../types/log-message';
import { Queue } from '../util/queue';

export class LogTowaClient {
	private client: Socket;
	private logQueue: Queue<LogMessage> = new Queue<LogMessage>();

	private currentScope: string | null = null;
	private tmpScope: string | null = null;

	constructor(private readonly options: LogTowaOptions) {
		this.client = io(options.host, {
			autoConnect: true,
			transports: ['websocket'],
			auth: {
				token: options.token,
				appkey: options.appKey,
			},
		})
			.on('connect', () => {
				console.log('[LogTowa] Cloud connected.');
				this.sendLogsFromQueue();
			})
			.on('disconnect', () => {
				console.warn('[LogTowa] Cloud disconnected.');
			})
			.on('error', (error) => {
				console.error(`[LogTowa] Error connecting to cloud. ${error}`);
			});
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

		console.log(`[${level}] [${scope}] ${message} ${meta}`);

		const msg: LogMessage = {
			scope: scope,
			appKey: this.options.appKey,
			level: level,
			message: message,
			meta: meta,
		};
		this.sendLog(msg);

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

	/**
	 * Send log message to the cloud.
	 * @param {LogMessage} message The log message to send.
	 */
	private sendLog(message: LogMessage) {
		if (this.client.connected && !this.client.disconnected) {
			this.client.emit('log', message);
			console.log('message sent');
		} else {
			message.timestamp = new Date();
			message.ns = process.hrtime()[1];
			console.log(message);
			this.logQueue.enqueue(message);
		}
	}

	/**
	 * retry sending messages which came in as the client was not connected
	 */
	private sendLogsFromQueue() {
		while (this.logQueue.size() !== 0) {
			const msg = this.logQueue.dequeue();
			if (msg) {
				this.sendLog(msg);
			}
		}
	}
}
