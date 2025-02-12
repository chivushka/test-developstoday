import * as React from 'react';
import { box } from './all-countries.styles';
import { countryService } from '~modules/country/services/country.service';
import CountryList from '~shared/components/country-list/country-list.component';
import { Country } from '~shared/types/country.types';

export const AllCountriesPage = (): React.ReactNode => {
	const [countries, setCountries] = React.useState<Country[]>([]);

	React.useEffect(() => {
		const fetchAllCountries = async () => {
			try {
				const response = await countryService.getAll();
				setCountries(response);
			} catch (error) {
				console.error('Failed to fetch countries:', error);
			}
		};
		fetchAllCountries();
	  }, []);

	  React.useEffect(() => {
		console.log(countries);
	  }, [countries]);
	

	return (
		<div className={box}>
			{!!countries ? (
        <CountryList countries={countries} />
      ) : (
        <p>Loading countries...</p>
      )}
		</div>
	);
};
