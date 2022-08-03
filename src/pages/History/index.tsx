import { HistoryContainer, HistoryList, Status } from './styles';

export const History = () => {
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
						<tr>
							<td>Nome da tarefa</td>
							<td>20min</td>
							<td>20:15</td>
							<td>
								<Status statusColor="green">Concluído</Status>
							</td>
						</tr>
						<tr>
							<td>Nome da tarefa</td>
							<td>20min</td>
							<td>20:15</td>
							<td>
								<Status statusColor="yellow">Em andamento</Status>
							</td>
						</tr>
						<tr>
							<td>Nome da tarefa</td>
							<td>20min</td>
							<td>20:15</td>
							<td>
								<Status statusColor="green">Concluído</Status>
							</td>
						</tr>
						<tr>
							<td>Nome da tarefa</td>
							<td>20min</td>
							<td>20:15</td>
							<td>
								<Status statusColor="red">Interrompido</Status>
							</td>
						</tr>
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	);
};
