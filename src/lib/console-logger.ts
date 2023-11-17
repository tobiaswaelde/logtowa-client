import { LogMessage } from '../types/log-message';
import util from 'node:util';
import { ConsoleColors } from '../util/console-colors';
import { ConsoleLoggerOptions } from '../types/options';
import { LogLevel } from '../types/log-level';

/**
 * Provides a console logging channel.
 */
export class ConsoleLogger {
	/**
	 * @param {ConsoleLoggerOptions} options The options.
	 */
	constructor(private readonly options: ConsoleLoggerOptions) {}

	/**
	 * Logs a message to the console.
	 * @param {LogMessage} message The message to log.
	 */
	public log(message: LogMessage) {
		if (this.options.level && LogLevel[message.level] > LogLevel[this.options.level]) {
			return;
		}

		const ts = this.getTimestamp();
		const sc = this.getScope(message);
		const lv = this.getLevel(message);
		const msg = this.getMessage(message);
		const met = this.getMeta(message);

		console.log(`${ts}${sc}${lv}${msg}${met}`);
	}

	private getTimestamp(): string {
		if (this.options.timestamps === false) return '';

		const ts = new Date();
		const h = ts.getHours().toFixed(0).padStart(2, '0');
		const m = ts.getMinutes().toFixed(0).padStart(2, '0');
		const s = ts.getSeconds().toFixed(0).padStart(2, '0');
		const ms = ts.getMilliseconds().toFixed(0).padStart(3, '0');
		const value = `${h}:${m}:${s}.${ms}`;

		return `${ConsoleColors.Dim}${value}${ConsoleColors.Reset}  `;
	}
	private getScope(msg: LogMessage): string {
		if (!msg.scope) return '';
		return `${ConsoleColors.Dim}[${msg.scope}] › ${ConsoleColors.Reset}`;
	}
	private getLevelColor(level: string) {
		switch (level) {
			case 'error':
				return ConsoleColors.Red;
			case 'warn':
				return ConsoleColors.Yellow;
			case 'info':
				return ConsoleColors.Blue;
			case 'success':
				return ConsoleColors.Green;
			case 'http':
				return ConsoleColors.Magenta;
			case 'db':
				return ConsoleColors.Cyan;
			case 'verbose':
				return ConsoleColors.Blue + ConsoleColors.Dim;
			case 'debug':
				return ConsoleColors.Yellow;
			case 'silly':
				return ConsoleColors.Dim;
		}
	}
	private getLevel(msg: LogMessage): string {
		const value = msg.level;
		return `${this.getLevelColor(msg.level)}${value.padEnd(10)}${ConsoleColors.Reset}  `;
	}
	private getMessage(msg: LogMessage): string {
		return `${msg.message} `;
	}
	private getMeta(msg: LogMessage): string {
		if (!msg.meta) return '';
		return `\n` + util.inspect(msg.meta, { depth: 3, colors: true });
	}
}
