import styled from 'styled-components';

export const CountdownContainer = styled.div`
	font-family: 'Roboto Mono', monospace;
	font-size: 10rem;
	line-height: 8rem;
	color: ${(props) => props.theme['shadow-100']};

	display: flex;
	gap: 1rem;

	span {
		background: ${(props) => props.theme['shadow-700']};
		padding: 2rem 1rem;
		border-radius: 8px;
	}
`;

export const Separator = styled.div`
	padding: 1rem 0;
	color: ${(props) => props.theme['shadow-600']};
	width: 4rem;
	overflow: hidden;
	display: flex;
	justify-content: center;
`;
