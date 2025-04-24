export interface Response<T> {
	data: T;
	error?: string;
	message?: string;
}

export type HTTPResponse<T> = Response<T> & {
	status: number;
};
