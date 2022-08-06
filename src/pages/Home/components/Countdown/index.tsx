import { differenceInSeconds } from 'date-fns';
import { useContext, useEffect } from 'react';
import { CyclesContext } from '../../../../contexts/CyclesContext';
import { CountdownContainer, Separator } from './styles';

export const Countdown = () => {
	const {
		activeCycle,
		activeCycleId,
		markCurrentCycleAsDone,
		amountSecondsPassed,
		setSecondsPassed
	} = useContext(CyclesContext);

	const totalSeconds: number = activeCycle ? activeCycle.minutesAmount * 60 : 0;

	useEffect(() => {
		let interval: number;

		if (activeCycle) {
			interval = setInterval(() => {
				const secondsDiff = differenceInSeconds(
					new Date(),
					new Date(activeCycle.startDate)
				);

				if (secondsDiff >= totalSeconds) {
					markCurrentCycleAsDone();
					setSecondsPassed(totalSeconds);
					clearInterval(interval);
				} else {
					setSecondsPassed(secondsDiff);
				}
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [
		activeCycle,
		totalSeconds,
		activeCycleId,
		markCurrentCycleAsDone,
		setSecondsPassed
	]);

	const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

	const minutesAmount = Math.floor(currentSeconds / 60);
	const secondsAmount = currentSeconds % 60;

	const minutes = String(minutesAmount).padStart(2, '0');
	const seconds = String(secondsAmount).padStart(2, '0');

	useEffect(() => {
		if (activeCycle) {
			document.title = `${minutes}:${seconds} - ${activeCycle.task}`;
		} else {
			document.title = `Task Finished`;
		}
	}, [minutes, seconds, activeCycle]);

	return (
		<CountdownContainer>
			<span>{minutes[0]}</span>
			<span>{minutes[1]}</span>
			<Separator>:</Separator>
			<span>{seconds[0]}</span>
			<span>{seconds[1]}</span>
		</CountdownContainer>
	);
};
