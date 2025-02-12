import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { countryService } from '~modules/country/services/country.service';
import CountryList from '~shared/components/country-list/country-list.component';
import { CountryInfo } from '~shared/types/country.types';
import { box } from './country-info.styles';

export const CountryInfoPage = (): React.ReactNode => {
  const [info, setInfo] = React.useState<CountryInfo | null>(); 
  const location = useLocation();
  const { additionalData } = location.state || {}; 

 
  React.useEffect(() => {
	console.log(additionalData);
    if (additionalData) {
      const fetchCountryInfo = async () => {
        try {
          const response = await countryService.getCountryInfo(additionalData.name, additionalData.code);
		  console.log(response);
		  setInfo(response); 
        } catch (error) {
          console.error('Failed to fetch country info:', error);
        }
      };
      fetchCountryInfo();
    }
  }, []);

	  React.useEffect(() => {
		console.log(info);
	  }, [info]);
	

	return (
		<div className={box}>
			<div>{}</div>
			{!!info ? (
        <CountryList countries={info.borders} />
      ) : (
        <p>Loading border countries...</p>
      )}
		</div>
	);
};