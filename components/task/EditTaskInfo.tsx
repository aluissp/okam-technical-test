import { ParsedTask } from '@/interfaces/models/task.interface';
import { formatDate } from '@/utils/format-date';

interface Props {
	task?: ParsedTask;
}
export const EditTaskInfo = ({ task }: Props) => {
	return (
		<>
			<p>Is deleted task: {task?.deleted ? 'Yes' : 'No'}</p>
			{task?.createdAt && <p>Created at: {formatDate(task.createdAt)}</p>}
			{task?.updatedAt && <p>Updated at: {formatDate(task.updatedAt)}</p>}
			<p>Owner: {task?.user?.name}</p>
		</>
	);
};
