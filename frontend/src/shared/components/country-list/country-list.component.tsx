import * as React from 'react';
import { box, text } from './country-list.styles';
import { BorderCountry, Country } from '~shared/types/country.types';
import CountryListItem from '../country-list-item/country-list-item.component';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';

type CountryListProps = {
	countries: Country[] | BorderCountry[];
};

const CountryList: React.FunctionComponent<CountryListProps> = ({
	countries,
}) => {
	const navigate = useNavigate();

	React.useEffect(() => {
		console.log(countries);
	}, []);

	const goToCountry = (name: string, code: string) => {
		navigate(
			`${ROUTER_KEYS.COUNTRY.replace(':name', name).replace(':code', code)}`,
		);
	};

	return (
		<div className={box}>
			{!!countries && countries.length > 0 ? (
				countries.map((country) => {
					const name =
						'name' in country
							? country.name
							: 'officialName' in country
								? country.officialName
								: '';
					const code =
						'countryCode' in country
							? country.countryCode
							: 'iso2' in country
								? country.iso2
								: 'iso3' in country
									? country.iso3
									: '';

					return (
						<CountryListItem
							key={code}
							name={name}
							code={code}
							onClick={() => goToCountry(name, code)}
						/>
					);
				})
			) : (
				<span className={text}>No countries available</span>
			)}
		</div>
	);
};

export default CountryList;
