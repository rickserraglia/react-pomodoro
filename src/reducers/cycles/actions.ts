import { Cycle } from './reducer';

export enum ActionTypes {
	// eslint-disable-next-line no-unused-vars
	CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
	// eslint-disable-next-line no-unused-vars
	INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
	// eslint-disable-next-line no-unused-vars
	MARK_CURRENT_CYCLE_AS_DONE = 'MARK_CURRENT_CYCLE_AS_DONE'
}

export const addNewCycleAction = (newCycle: Cycle) => {
	return { type: ActionTypes.CREATE_NEW_CYCLE, payload: { newCycle } };
};

export const interruptCurrentCycleAction = () => {
	return {
		type: ActionTypes.INTERRUPT_CURRENT_CYCLE
	};
};

export const markCurrentCycleAsDoneAction = () => {
	return {
		type: ActionTypes.MARK_CURRENT_CYCLE_AS_DONE
	};
};
