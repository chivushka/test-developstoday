import * as React from 'react';
import { box, countryName } from './country-list-item.styles';

type CountryListItemProps = {
	name: string;
	code: string;
	onClick?: () => void;
};

const CountryListItem: React.FunctionComponent<CountryListItemProps> = ({
	name,
	code,
	onClick,
}) => {
	const handleClick = (): void => {
		onClick?.();
	};

	return (
		<div className={box} onClick={handleClick}>
			<span className={countryName}>
				{name} ({code})
			</span>
		</div>
	);
};

export default CountryListItem;
