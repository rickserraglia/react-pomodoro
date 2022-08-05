import { HandPalm, Play } from 'phosphor-react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useContext } from 'react';
import {
	HomeContainer,
	StartCountdownButton,
	StopCountdownButton
} from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';
import { CyclesContext } from '../../contexts/CyclesContext';

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
	const { activeCycle, createNewCycle, interruptCurrentCycle } =
		useContext(CyclesContext);

	const newCycleForm = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 5
		}
	});
	const { handleSubmit, watch, reset } = newCycleForm;

	const handleCreateNewCycle = (data: NewCycleFormData) => {
		createNewCycle(data);
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
				<FormProvider {...newCycleForm}>
					<NewCycleForm />
				</FormProvider>
				<Countdown />

				{activeCycle ? (
					<StopCountdownButton type="button" onClick={interruptCurrentCycle}>
						<HandPalm size={24} /> Pausar
					</StopCountdownButton>
				) : (
					<StartCountdownButton disabled={isSubmitDisabled} type="submit">
						<Play size={24} /> Iniciar
					</StartCountdownButton>
				)}
			</form>
		</HomeContainer>
	);
};
