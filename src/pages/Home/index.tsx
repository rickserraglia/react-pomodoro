import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {
	CountdownContainer,
	FormContainer,
	HomeContainer,
	MinutesAmountInput,
	Separator,
	StartCountdownButton,
	TaskInput
} from './styles';

const newCycleFormValidationSchema = zod.object({
	task: zod
		.string()
		.min(1, 'Informe a Tarefa')
		.max(100, 'A tarefa não pode ter mais de 100 caracteres'),
	minutesAmount: zod
		.number()
		.min(5, 'O ciclo precisa ter no mínimo 5 minutos')
		.max(60, 'O ciclo precisa ter no máximo 60 minutos')
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const Home = () => {
	const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 0
		}
	});

	const handleCreateNewCycle = (data: NewCycleFormData) => {
		console.log(data);
		reset();
	};

	const watchForm = {
		task: watch('task'),
		minutesAmount: watch('minutesAmount')
	};

	const isSubmitDisabled = !watchForm.task || !watchForm.minutesAmount;

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
				<FormContainer>
					<label htmlFor="task">Vou trabalhar em</label>
					<TaskInput
						id="task"
						type="text"
						list="task-suggestions"
						placeholder="Dê um nome ao seu projeto"
						{...register('task')}
					/>

					<datalist id="task-suggestions">
						<option value="Projeto 1"></option>
					</datalist>

					<label htmlFor="minutesAmount">durante</label>
					<MinutesAmountInput
						type="number"
						id="minutesAmount"
						placeholder="00"
						step={5}
						min={5}
						max={60}
						{...register('minutesAmount', { valueAsNumber: true })}
					/>
					<span>minutos.</span>
				</FormContainer>

				<CountdownContainer>
					<span>0</span>
					<span>0</span>
					<Separator>:</Separator>
					<span>0</span>
					<span>0</span>
				</CountdownContainer>

				<StartCountdownButton disabled={isSubmitDisabled} type="submit">
					<Play size={24} /> Iniciar
				</StartCountdownButton>
			</form>
		</HomeContainer>
	);
};
