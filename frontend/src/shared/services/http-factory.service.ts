import { HttpService } from './http.service';

import { mainAxios } from './mainAxios';

export class HttpFactoryService {
	public createHttpService(): HttpService {
		return new HttpService(mainAxios);
	}
}
