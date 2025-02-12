import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
	BorderCountry,
	CountryWithBorderCountriesResponse,
	CountryWithFlag,
	CountryWithFlagResponse,
	CountryWithPopulation,
	CountryWithPopulationResponse,
	ListCountry,
	Population,
} from './types/country.types';
import { handleError } from 'src/common/utils/error-handler';

@Injectable()
export class CountryService {
	constructor(private readonly httpService: HttpService) {}

	getAvailableCountries() {
		return this.fetchCountries();
	}

	async getCountryInfo(code: string, name: string) {
		const borders = await this.fetchListOfBorderCountries(code);
		const population = await this.fetchPopulationOfCountry(name);
		const flag = await this.fetchFlagUrl(code);
		const data = { borders, population, flag };
		return data;
	}

	async fetchCountries(): Promise<ListCountry[]> {
		try {
			const response = await firstValueFrom(
				this.httpService.get<ListCountry[]>(
					'https://date.nager.at/api/v3/AvailableCountries',
				),
			);
			return response.data;
		} catch (error: unknown) {
			handleError(error, 'fetchCountries');
			throw new HttpException(
				'Failed to fetch available countries.',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async fetchListOfBorderCountries(code: string): Promise<BorderCountry[]> {
		try {
			const response = await firstValueFrom(
				this.httpService.get<CountryWithBorderCountriesResponse>(
					`https://date.nager.at/api/v3/CountryInfo/${code}`,
				),
			);
			const borders = response.data?.borders || [];
			return borders;
		} catch (error: unknown) {
			handleError(error, 'fetchListOfBorderCountries');
			throw new HttpException(
				`Failed to fetch border countries for code: ${code}`,
				HttpStatus.NOT_FOUND,
			);
		}
	}

	async fetchPopulationOfCountry(name: string): Promise<Population[]> {
		try {
			const response = await firstValueFrom(
				this.httpService.get<CountryWithPopulationResponse>(
					'https://countriesnow.space/api/v0.1/countries/population',
				),
			);

			const allCountriesPopulationResponse = response.data;
			const allCountriesPopulation = allCountriesPopulationResponse.data;

			const countryPopulation = allCountriesPopulation.find(
				(country: CountryWithPopulation) => country.country === name,
			);
			return countryPopulation ? countryPopulation.populationCounts : [];
		} catch (error: unknown) {
			handleError(error, 'fetchPopulationOfCountry');
			throw new HttpException(
				`Failed to fetch population data for country: ${name}`,
				HttpStatus.NOT_FOUND,
			);
		}
	}

	async fetchFlagUrl(code: string): Promise<string> {
		try {
			const response = await firstValueFrom(
				this.httpService.get<CountryWithFlagResponse>(
					'https://countriesnow.space/api/v0.1/countries/flag/images',
				),
			);

			const allCountriesFlagResponse = response.data;
			const allCountriesFlag = allCountriesFlagResponse.data;

			const countryWithFlag = allCountriesFlag.find(
				(country: CountryWithFlag) => country.iso2 === code,
			) as CountryWithFlag;

			return countryWithFlag ? countryWithFlag.flag : '';
		} catch (error: unknown) {
			handleError(error, 'fetchFlagUrl');
			throw new HttpException(
				`Failed to fetch flag for country code: ${code}`,
				HttpStatus.NOT_FOUND,
			);
		}
	}
}
