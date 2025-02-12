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
    countries
}) => {
    const navigate = useNavigate();

    React.useEffect(() => {
            console.log(countries);
          }, []);
    
    const goToCountry = (code: string, name: string) => {
        navigate(`${ROUTER_KEYS.COUNTRY.replace(':name', name)}`, {
            state: { name, code }
        });
    };

    return (
        <div className={box}>
           {!!countries ? (
                countries.map((country) => (
                    <CountryListItem key={country.countryCode} 
                    name={country.name} 
                    code={country.countryCode} 
                    onClick={() => goToCountry(country.countryCode, country.name)}/>
                ))
            ) : (
                <span className={text}>No countries available</span>
            )}
        </div>
        
    );
};

export default CountryList;