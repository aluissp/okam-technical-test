import { ParsedTask } from '@/interfaces/models/task.interface';
import { formatDate } from '@/utils/format-date';

interface Props {
	task: ParsedTask;
}
export const TaskDetails = ({ task }: Props) => {
	return (
		<section>
			<p>Title: {task.title}</p>
			<p>Description: {task.description}</p>
			<p>Due date: {task.dueDate}</p>
			<p>Completed: {task.completed ? 'Yes' : 'No'}</p>

			<p>Created at: {formatDate(task.createdAt)}</p>
			<p>Updated at: {formatDate(task.updatedAt)}</p>

			<p>Owner: {task?.user?.name}</p>
		</section>
	);
};
