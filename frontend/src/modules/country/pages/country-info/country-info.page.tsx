import * as React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { countryService } from '~modules/country/services/country.service';
import CountryList from '~shared/components/country-list/country-list.component';
import { CountryInfo } from '~shared/types/country.types';
import {
	box,
	countryName,
	headerContainer,
	img,
	title,
} from './country-info.styles';
import PopulationChart from '~shared/components/population-chart/population-chart.component';

export const CountryInfoPage = (): React.ReactNode => {
	const [info, setInfo] = React.useState<CountryInfo | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const { name, code } = useParams<{ name: string; code: string }>();

	React.useEffect(() => {
		const fetchCountryInfo = async () => {
			try {
				setIsLoading(true);
				const response = await countryService.getCountryInfo(
					name,
					code,
				);
				console.log(response);
				setInfo(response);
			} catch (error) {
				console.error('Failed to fetch country info:', error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchCountryInfo();
	}, [name, code]);

	return (
		<div className={box}>
			{!isLoading && !!info ? (
				<>
					<div className={headerContainer}>
						<div className={countryName}>{name}</div>
						{!!info.flag && (
							<img className={img} src={info.flag} alt="" />
						)}
					</div>

					<div className={title}>Border Countries</div>
					<CountryList countries={info.borders} />

					<div className={title}>Population Chart</div>
					<PopulationChart data={info.population} />
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};
