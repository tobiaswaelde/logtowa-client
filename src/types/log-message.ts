/**
 * Type of log message to send to the backend
 */
export type LogMessage = {
	/** Nanoseconds part of the timestamp. */
	ns?: number;

	/** The log level. */
	level: string;

	/** The scope. */
	scope?: string | null;

	/** The message. */
	message: string;

	/** The meta data. */
	meta?: object | null;
};

export type CloudLogMessage = LogMessage & {
	/** The project key. */
	appKey: string;

	/** The timestamp of the message. */
	timestamp?: Date;
};
