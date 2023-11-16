import { Socket, io } from 'socket.io-client';
import { Queue } from '../util/queue';
import { LogMessage } from '../types/log-message';
import { LogTowaOptions } from '../types/options';

export class CloudLogger {
	private client: Socket;
	private queue: Queue<LogMessage> = new Queue<LogMessage>();

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

	/**
	 * Send log message to the cloud.
	 * @param {LogMessage} message The log message to send.
	 */
	public log(message: LogMessage) {
		if (this.client.connected && !this.client.disconnected) {
			this.client.emit('log', message);
		} else {
			message.timestamp = new Date();
			message.ns = process.hrtime()[1];
			this.queue.enqueue(message);
		}
	}

	/**
	 * retry sending messages which came in as the client was not connected
	 */
	private sendLogsFromQueue() {
		while (this.queue.size() !== 0) {
			const msg = this.queue.dequeue();
			if (msg) {
				this.log(msg);
			}
		}
	}
}
