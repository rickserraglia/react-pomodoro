import { useContext } from 'react';
import { CyclesContext } from '../../contexts/CyclesContext';
import { HistoryContainer, HistoryList, Status } from './styles';
import { formatDistanceToNow } from 'date-fns';

export const History = () => {
	const { cycles } = useContext(CyclesContext);
	document.title = `Tasks History`;
	return (
		<HistoryContainer>
			<h1>My history</h1>

			<HistoryList>
				<table>
					<thead>
						<tr>
							<th>Task</th>
							<th>Duration</th>
							<th>Started</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{cycles.length ? (
							cycles
								.map((cycle) => {
									return (
										<tr key={cycle.id}>
											<td>{cycle.task}</td>
											<td>{cycle.minutesAmount} minutes</td>
											<td>
												{formatDistanceToNow(cycle.startDate, {
													addSuffix: true
												})}
											</td>
											<td>
												{cycle.doneDate && (
													<Status statusColor="green">Done</Status>
												)}
												{cycle.interruptionDate && (
													<Status statusColor="red">Interrupted</Status>
												)}
												{!cycle.doneDate && !cycle.interruptionDate && (
													<Status statusColor="yellow">In Progress</Status>
												)}
											</td>
										</tr>
									);
								})
								.reverse()
						) : (
							<tr>
								<td colSpan={4} className="no-entries">
									No cycles yet
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	);
};
