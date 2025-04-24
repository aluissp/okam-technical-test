import { History } from '../../prisma/generated/index';

interface Props {
	histories: History[];
}
export const TaskHistory = ({ histories }: Props) => {
	return (
		<section className='mt-10'>
			{histories.length > 0 ? (
				<div>
					<h2>Task History</h2>
					<ul>
						{histories.map(history => (
							<li key={history.id} className='border rounded-lg'>
								<p>Field: {history.field}</p>
								<p>Old value: {history.oldValue}</p>
								<p>New value: {history.newValue}</p>
								{/* <p>Change at: {formatDate(history.changeAt??)}</p> */}
							</li>
						))}
					</ul>
				</div>
			) : (
				<p>No history available for this task.</p>
			)}
		</section>
	);
};
