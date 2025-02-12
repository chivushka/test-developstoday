import { HttpFactoryService } from '~shared/services/http-factory.service';
import { HttpService } from '~shared/services/http.service';
import { Country, CountryInfo } from '~shared/types/country.types';

export class CountryService {
	constructor(private readonly httpService: HttpService) {}

	public async getAll(): Promise<Country[]> {
		return this.httpService.get<Country[]>('country');
	}

	public async getCountryInfo(
		name: string,
		code: string,
	): Promise<CountryInfo> {
		return this.httpService.get<CountryInfo>(`country/${code}/${name}`);
	}
}

export const countryService = new CountryService(
	new HttpFactoryService().createHttpService(),
);
