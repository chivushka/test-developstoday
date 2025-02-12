export interface ListCountry {
	countryCode: string;
	name: string;
}

export interface BorderCountry {
	commonName: string;
	officialName: string;
	countryCode: string;
	region: string;
	borders: BorderCountry[] | null;
}

export interface CountryWithBorderCountriesResponse {
	commonName: string;
	officialName: string;
	countryCode: string;
	region: string;
	borders: BorderCountry[] | null;
}

export interface Population {
	year: number;
	value: number;
}

export interface CountryWithPopulation {
	country: string;
	code: string;
	iso3: string;
	populationCounts: Population[];
}

export interface CountryWithPopulationResponse {
	error: boolean;
	msg: string;
	data: CountryWithPopulation[];
}

export interface CountryWithFlag {
	name: string;
	flag: string;
	iso2: string;
	iso3: string;
}

export interface CountryWithFlagResponse {
	error: boolean;
	msg: string;
	data: CountryWithFlag[];
}
