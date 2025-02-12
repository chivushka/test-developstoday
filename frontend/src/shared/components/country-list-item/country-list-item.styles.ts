import { css } from '@emotion/css';
import { colors } from '~shared/styles';
export const box = css`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	height: 50px;
	padding: 10px;
	border-bottom: 1px solid ${colors.light_blue};
	cursor: pointer;
	&:hover {
		background-color: ${colors.light_blue};
	}
`;

export const countryName = css`
	font-size: 16px;
	user-select: none;
	cursor: pointer;
`;
