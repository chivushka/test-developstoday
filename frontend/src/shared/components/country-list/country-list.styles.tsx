import { css } from '@emotion/css';
import { colors } from '~shared/styles';

export const box = css`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-top: 1px solid ${colors.light_blue};
`;

export const text = css`
	font-size: 16px;
`;
