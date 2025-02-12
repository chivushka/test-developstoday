import { AxiosError } from 'axios';

export function handleError(error: unknown, method: string): void {
	if (error instanceof AxiosError) {
		console.error(`Axios error in ${method}:`, error.message);
		if (error.response) {
			console.error('Error response:', error.response.data);
		}
	} else if (error instanceof Error) {
		console.error(`Error in ${method}:`, error.message);
	} else {
		console.error(`Unknown error in ${method}:`, error);
	}
}
