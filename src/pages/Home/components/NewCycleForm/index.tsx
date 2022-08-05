import { FormContainer, MinutesAmountInput, TaskInput } from './styles';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { CyclesContext } from '../../../../contexts/CyclesContext';

export const NewCycleForm = () => {
	const { activeCycle } = useContext(CyclesContext);
	const { register } = useFormContext();

	return (
		<FormContainer>
			<label htmlFor="task">Vou trabalhar em</label>
			<TaskInput
				id="task"
				type="text"
				list="task-suggestions"
				placeholder="Dê um nome ao seu projeto"
				disabled={!!activeCycle}
				{...register('task')}
			/>

			<datalist id="task-suggestions">
				<option value="Projeto 1"></option>
				<option value="Projeto 2"></option>
				<option value="Projeto 3"></option>
				<option value="Projeto 4"></option>
				<option value="Projeto 5"></option>
			</datalist>

			<label htmlFor="minutesAmount">durante</label>
			<MinutesAmountInput
				type="number"
				id="minutesAmount"
				placeholder="00"
				disabled={!!activeCycle}
				step={5}
				min={5}
				max={60}
				{...register('minutesAmount', { valueAsNumber: true })}
			/>
			<span>minutos.</span>
		</FormContainer>
	);
};
