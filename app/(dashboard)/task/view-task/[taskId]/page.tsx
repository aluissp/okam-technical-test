import { Title } from '@/components/ui/title/Title';
import { getTaskByIdAction } from '@/actions/tasks/tasks';
import { formatDate } from '@/utils/format-date';
import { notFound } from 'next/navigation';

interface Props {
	params: Promise<{ taskId: string }>;
}

export default async function ViewTaskPage({ params }: Props) {
	const { taskId } = await params;

	const { data: task } = await getTaskByIdAction(taskId);

	if (!task) notFound();

	return (
		<>
			<Title title='Task details' />
			<section>
				<p>Title: {task?.title}</p>
				<p>Description: {task?.description}</p>
				<p>Due date: {task?.dueDate}</p>
				<p>Completed: {task?.completed ? 'Yes' : 'No'}</p>

				{task?.createdAt && <p>Created at: {formatDate(task.createdAt)}</p>}
				{task?.updatedAt && <p>Updated at: {formatDate(task.updatedAt)}</p>}

				<p>Owner: {task?.user.name}</p>
			</section>
		</>
	);
}
