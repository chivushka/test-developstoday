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
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CountryService {
	private countriesApiUrl: string;
	private borderCountriesApiUrl: string;
	private populationCountriesApiUrl: string;
	private flagCountriesApiUrl: string;

	constructor(
		private readonly httpService: HttpService,
		private config: ConfigService,
	) {
		const countriesApiUrl = this.config.get<string>('COUNTRIES_API_URL');
		const borderCountriesApiUrl = this.config.get<string>(
			'BORDER_COUNTRIES_API_URL',
		);
		const populationCountriesApiUrl = this.config.get<string>(
			'POPULATION_COUNTRIES_API_URL',
		);
		const flagCountriesApiUrl = this.config.get<string>(
			'FLAG_COUNTRIES_API_URL',
		);

		if (
			!countriesApiUrl ||
			!borderCountriesApiUrl ||
			!populationCountriesApiUrl ||
			!flagCountriesApiUrl
		) {
			throw new Error(
				'Required environment variables for any countries API are missing.',
			);
		}
		this.countriesApiUrl = countriesApiUrl;
		this.borderCountriesApiUrl = borderCountriesApiUrl;
		this.populationCountriesApiUrl = populationCountriesApiUrl;
		this.flagCountriesApiUrl = flagCountriesApiUrl;
	}

	getAvailableCountries() {
		return this.fetchCountries();
	}

	async getCountryInfo(code: string, name: string) {
		const borders = await this.fetchListOfBorderCountries(code);
		const flagData = await this.fetchFlagUrl(code);
		const population = await this.fetchPopulationOfCountry(
			flagData.iso3 ?? name,
		);
		console.log(flagData, population);
		const data = { borders, population, flag: flagData.flag ?? '' };
		return data;
	}

	async fetchCountries(): Promise<ListCountry[]> {
		try {
			const response = await firstValueFrom(
				this.httpService.get<ListCountry[]>(this.countriesApiUrl),
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
					this.borderCountriesApiUrl + `/${code}`,
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

	async fetchPopulationOfCountry(code: string): Promise<Population[]> {
		try {
			const response = await firstValueFrom(
				this.httpService.get<CountryWithPopulationResponse>(
					this.populationCountriesApiUrl,
				),
			);

			const allCountriesPopulationResponse = response.data;
			const allCountriesPopulation = allCountriesPopulationResponse.data;

			const countryPopulation = allCountriesPopulation.find(
				(country: CountryWithPopulation) => country.iso3 === code,
			);
			return countryPopulation ? countryPopulation.populationCounts : [];
		} catch (error: unknown) {
			handleError(error, 'fetchPopulationOfCountry');
			throw new HttpException(
				`Failed to fetch population data for country code: ${code}`,
				HttpStatus.NOT_FOUND,
			);
		}
	}

	async fetchFlagUrl(
		code: string,
	): Promise<{ flag?: string; iso3?: string }> {
		try {
			const response = await firstValueFrom(
				this.httpService.get<CountryWithFlagResponse>(
					this.flagCountriesApiUrl,
				),
			);

			const allCountriesFlagResponse = response.data;
			const allCountriesFlag = allCountriesFlagResponse.data;

			const countryWithFlag = allCountriesFlag.find(
				(country: CountryWithFlag) => country.iso2 === code,
			) as CountryWithFlag;

			return countryWithFlag
				? { flag: countryWithFlag.flag, iso3: countryWithFlag.iso3 }
				: {};
		} catch (error: unknown) {
			handleError(error, 'fetchFlagUrl');
			throw new HttpException(
				`Failed to fetch flag for country code: ${code}`,
				HttpStatus.NOT_FOUND,
			);
		}
	}
}
