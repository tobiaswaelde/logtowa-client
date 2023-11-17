import { LogLevel } from './log-level';

/**
 * The options to configure the LogTowa transport.
 */
export type LogTowaOptions = {
	/**
	 * The URL to the LogTowa backend.
	 */
	host: string;

	/**
	 * The API token.
	 */
	token: string;

	/**
	 * The project key of the project to which the logger should send the logs.
	 */
	appKey: string;
};

export type CloudLoggerOptions = LogTowaOptions & {
	enabled?: boolean;
	level?: keyof typeof LogLevel;
};

export type ConsoleLoggerOptions = {
	enabled?: boolean;
	level?: keyof typeof LogLevel;
	timestamps?: boolean;
};

export type LogTowaClientOptions = {
	level?: keyof typeof LogLevel;
	cloud?: CloudLoggerOptions;
	console?: ConsoleLoggerOptions;
};
