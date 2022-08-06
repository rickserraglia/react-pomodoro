import { differenceInSeconds } from 'date-fns';
import {
	createContext,
	ReactNode,
	useState,
	useReducer,
	useEffect
} from 'react';
import {
	addNewCycleAction,
	interruptCurrentCycleAction,
	markCurrentCycleAsDoneAction
} from '../reducers/cycles/actions';
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer';

interface CreateCycleData {
	task: string;
	minutesAmount: number;
}

interface CyclesContextType {
	cycles: Cycle[];
	activeCycle: Cycle | undefined;
	activeCycleId: string | null;
	amountSecondsPassed: number;
	markCurrentCycleAsDone: () => void;
	setSecondsPassed: (seconds: number) => void;
	createNewCycle: (data: CreateCycleData) => void;
	interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
	children: ReactNode;
}

export const CyclesContextProvider = ({
	children
}: CyclesContextProviderProps) => {
	const [cyclesState, dispatch] = useReducer(
		cyclesReducer,
		{
			cycles: [],
			activeCycleId: null
		},
		() => {
			const storedStateAsJSON = localStorage.getItem(
				'@pomodoro-timer:cycles-state-1.0.0'
			);

			if (storedStateAsJSON) {
				return JSON.parse(storedStateAsJSON);
			}
		}
	);

	const { cycles, activeCycleId } = cyclesState;
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
		if (activeCycle) {
			return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
		}

		return 0;
	});

	useEffect(() => {
		const stateJSON = JSON.stringify(cyclesState);
		localStorage.setItem('@pomodoro-timer:cycles-state-1.0.0', stateJSON);
	}, [cyclesState]);

	const createNewCycle = (data: CreateCycleData) => {
		const newCycle: Cycle = {
			id:
				(Math.random() + 1).toString(36).substring(2) +
				new Date().getTime().toString(36),
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date()
		};
		dispatch(addNewCycleAction(newCycle));
		setAmountSecondsPassed(0);
	};

	function interruptCurrentCycle() {
		dispatch(interruptCurrentCycleAction());
	}

	const setSecondsPassed = (seconds: number) => {
		setAmountSecondsPassed(seconds);
	};

	const markCurrentCycleAsDone = () => {
		dispatch(markCurrentCycleAsDoneAction());
	};

	return (
		<CyclesContext.Provider
			// eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
			value={{
				cycles,
				activeCycle,
				activeCycleId,
				markCurrentCycleAsDone,
				amountSecondsPassed,
				setSecondsPassed,
				createNewCycle,
				interruptCurrentCycle
			}}
		>
			{children}
		</CyclesContext.Provider>
	);
};
