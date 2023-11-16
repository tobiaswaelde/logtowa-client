import { LogLevel } from '../types/log-level';
import { LogMessage } from '../types/log-message';
import util from 'node:util';
import { ConsoleColors } from '../util/console-colors';
import { DateTime } from 'luxon';

type ConsoleLoggerOptions = {
	enabled: boolean;
	level: LogLevel;
	timestamps: {
		enabled: boolean;
		format: string;
	};
};

export class ConsoleLogger {
	constructor(private readonly options: ConsoleLoggerOptions) {}

	public log(message: LogMessage) {
		const ts = this.getTimestamp();
		const sc = this.getScope(message);
		const lv = this.getLevel(message);
		const msg = this.getMessage(message);
		const met = this.getMeta(message);

		console.log(`${ts}${sc}${lv}${msg}${met}`);
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

	private getTimestamp(): string {
		if (!this.options.timestamps.enabled) return '';

		const value = DateTime.now().toFormat(this.options.timestamps.format);
		return `${ConsoleColors.Dim}${value}${ConsoleColors.Reset}  `;
	}
	private getScope(msg: LogMessage): string {
		if (!msg.scope) return '';
		return `${ConsoleColors.Dim}[${msg.scope}] › ${ConsoleColors.Reset}`;
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
