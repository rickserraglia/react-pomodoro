import styled from 'styled-components';

export const HomeContainer = styled.main`
	flex: 1;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3.5rem;
	}
`;

export const CountdownButton = styled.button`
	width: 100%;
	border: 0;
	padding: 1rem;
	border-radius: 8px;

	display: flex;
	align-items: center;
	justify-content: center;
	color: ${(props) => props.theme['shadow-100']};

	gap: 0.5rem;
	font-weight: bold;

	cursor: pointer;

	&:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
`;

export const StartCountdownButton = styled(CountdownButton)`
	background: ${(props) => props.theme['primary-500']};

	&:not(:disabled):hover {
		background: ${(props) => props.theme['primary-700']};
	}
`;

export const StopCountdownButton = styled(CountdownButton)`
	background: ${(props) => props.theme['secondary-500']};

	&:not(:disabled):hover {
		background: ${(props) => props.theme['secondary-700']};
	}
`;
