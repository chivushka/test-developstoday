import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AllCountriesPage } from '~modules/country/pages/all-countries/all-countries.page';
import { CountryInfoPage } from '~modules/country/pages/country-info/country-info.page';
import { ROUTER_KEYS } from '~shared/keys';

export const routes = (
	<Routes>
		<Route path={ROUTER_KEYS.COUNTRIES} element={<AllCountriesPage />} />
		<Route path={ROUTER_KEYS.COUNTRY} element={<CountryInfoPage />} />
		<Route
			path={ROUTER_KEYS.ALL_MATCH}
			element={<Navigate to={ROUTER_KEYS.COUNTRIES} />}
		/>
	</Routes>
);

