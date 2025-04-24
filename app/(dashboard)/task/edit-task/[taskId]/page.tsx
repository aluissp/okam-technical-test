import { Title } from '@/components/ui/title/Title';
import { TaskForm } from '@/components/task/TaskForm';
import { getTaskByIdAction } from '@/actions/tasks/tasks';
import { EditTaskInfo } from '@/components/task/EditTaskInfo';

interface Props {
	params: Promise<{ taskId: string }>;
}

export default async function EditTaskPage({ params }: Props) {
	const { taskId } = await params;

	const { data: task } = await getTaskByIdAction(taskId);
	return (
		<>
			<Title title='Edit task' />

			<TaskForm task={task} />

			<EditTaskInfo task={task} />
		</>
	);
}
