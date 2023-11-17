import { LogLevel } from './log-level';

/**
 * Cloud logging options.
 */
export type CloudLoggerOptions = {
	/**
	 * Setting this to `true` will enable cloud logs.
	 * @default false
	 */
	enabled?: boolean;

	/**
	 * Specify the minimim level to log.
	 * @default "verbose"
	 */
	level?: keyof typeof LogLevel;

	/**
	 * Specify the URL to the LogTowa backend. This can be found in the LogTowa web UI.
	 */
	host: string;

	/**
	 * Specify the token to authenticate websocket requests. This can be found in the LogTowa web UI.
	 */
	token: string;

	/**
	 * Specify the app key of the app to which the logger should send the logs. This can be found in the LogTowa web UI.
	 */
	appKey: string;
};

/**
 * Console logging options.
 */
export type ConsoleLoggerOptions = {
	/**
	 * Setting this to `true` will enable console logs.
	 * @default false
	 */
	enabled?: boolean;

	/**
	 * Specify the minimim level to log.
	 * @default "verbose"
	 */
	level?: keyof typeof LogLevel;

	/**
	 * Setting this to `false` will prevent showing timestamps in the console logs.
	 * @default true
	 */
	timestamps?: boolean;

	/**
	 * Format the output of the meta data.
	 */
	meta?: {
		/**
		 * Specifies the number of times to recurse while formatting object. This is useful for inspecting large objects. To recurse up to the maximum call stack size pass `Infinity` or `null`.
		 * @default 2
		 */
		maxDepth?: number;

		/**
		 * Setting this to `false` causes each object key to be displayed on a new line.
		 * @default true
		 */
		compact?: boolean;

		/**
		 * Specifies the maximum number of characters to include when formatting. Set to `null` or `Infinity` to show all elements. Set to `0` or negative to show no characters.
		 * @default 10000
		 */
		maxStringLength?: number;

		/**
		 * Specifies the maximum number of `Array`, `TypedArray`, `WeakMap`, and `WeakSet` elements to include when formatting. Set to `null` or `Infinity` to show all elements. Set to `0` or negative to show no elements.
		 * @default 100
		 */
		maxArrayLenth?: number;
	};
};

export type LogTowaClientOptions = {
	/**
	 * Specify the minimim level to log.
	 * @default "verbose"
	 */
	level?: keyof typeof LogLevel;

	/**
	 * Specify cloud logging options.
	 * @default undefined
	 */
	cloud?: CloudLoggerOptions;

	/**
	 * Specify console logging options.
	 * @default undefined
	 */
	console?: ConsoleLoggerOptions;
};
