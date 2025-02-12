export interface Country {
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

export interface Population {
	year: number;
	value: number;
}

export interface CountryInfo {
	borders: BorderCountry[];
	population: Population[];
	flag: string;
}
