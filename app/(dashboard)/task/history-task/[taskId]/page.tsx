import { notFound } from 'next/navigation';
import { Title } from '@/components/ui/title/Title';
import { getTaskByIdAction } from '@/actions/tasks/tasks';
import { TaskDetails } from '@/components/task/TaskDetails';
import { TaskHistory } from '@/components/task/TaskHistory';

interface Props {
	params: Promise<{ taskId: string }>;
}

export default async function HistoryTaskPage({ params }: Props) {
	const { taskId } = await params;

	const { data: task } = await getTaskByIdAction(taskId);

	if (!task) notFound();

	return (
		<>
			<Title title='Task details' />

			{task && <TaskDetails task={task} />}

			{task && <TaskHistory histories={task.histories} />}
		</>
	);
}
