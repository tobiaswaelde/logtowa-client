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

export type LogTowaClientOptions = {
	cloud?: LogTowaOptions & {
		enabled?: boolean;
	};
	console: {
		enabled?: boolean;
	};
};
