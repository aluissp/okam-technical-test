import { Title } from '@/components/ui/title/Title';
import { TaskForm } from '@/components/task/TaskForm';

export default function NewTaskPage() {
	return (
		<>
			<Title title='Create new task' />

			<TaskForm />
		</>
	);
}
