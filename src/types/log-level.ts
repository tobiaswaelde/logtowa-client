export type LogLevel =
	| 'error'
	| 'warn'
	| 'info'
	| 'success'
	| 'http'
	| 'db'
	| 'verbose'
	| 'debug'
	| 'silly';

export enum ELogLevel {
	Error = 0,
	Warn = 1,
	Info = 2,
	Success = 3,
	Http = 4,
	Db = 5,
	Verbose = 6,
	Debug = 7,
	Silly = 8,
}
