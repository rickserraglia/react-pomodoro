import { createContext, ReactNode, useState } from 'react';

interface CreateCycleData {
	task: string;
	minutesAmount: number;
}

interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
	startDate: Date;
	interruptionDate?: Date;
	doneDate?: Date;
}

interface CyclesContextType {
	cycles: Cycle[];
	activeCycle: Cycle | undefined;
	activeCycleId: string | null;
	amountSecondsPassed: number;
	markCurrentCycleAsDone: () => void;
	setSecondsPassed: (seconds: number) => void;
	resetCycleId: () => void;
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
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	const createNewCycle = (data: CreateCycleData) => {
		const newCycle: Cycle = {
			id:
				(Math.random() + 1).toString(36).substring(2) +
				new Date().getTime().toString(36),
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date()
		};
		setCycles((state) => [...state, newCycle]);
		setActiveCycleId(newCycle.id);
		setAmountSecondsPassed(0);
	};

	function interruptCurrentCycle() {
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, interruptionDate: new Date() };
				} else {
					return cycle;
				}
			})
		);
		setActiveCycleId(null);
	}

	const setSecondsPassed = (seconds: number) => {
		setAmountSecondsPassed(seconds);
	};

	const markCurrentCycleAsDone = () => {
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, doneDate: new Date() };
				} else {
					return cycle;
				}
			})
		);
	};

	const resetCycleId = () => setActiveCycleId(null);

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
				resetCycleId,
				createNewCycle,
				interruptCurrentCycle
			}}
		>
			{children}
		</CyclesContext.Provider>
	);
};
