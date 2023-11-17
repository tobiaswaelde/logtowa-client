import { LogLevel } from './log-level';

/**
 * Cloud logging options.
 */
export type CloudLoggerOptions = {
	/**
	 * Enable/disable cloud logging.
	 */
	enabled?: boolean;

	/**
	 * The minimim level to log.
	 */
	level?: keyof typeof LogLevel;

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

/**
 * Console logging options.
 */
export type ConsoleLoggerOptions = {
	/**
	 * Enable/disable cloud logging.
	 */
	enabled?: boolean;

	/**
	 * The minimim level to log.
	 */
	level?: keyof typeof LogLevel;

	/**
	 * Enable/disable timestamps.
	 */
	timestamps?: boolean;
};

export type LogTowaClientOptions = {
	/** the minimim level to log. */
	level?: keyof typeof LogLevel;

	/**
	 * The cloud logging options.
	 */
	cloud?: CloudLoggerOptions;

	/**
	 * The console logging options.
	 */
	console?: ConsoleLoggerOptions;
};
