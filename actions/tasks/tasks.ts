import { getAllTasks } from '@/controllers/tasks/tasks';
import { format } from 'date-fns';

export const getAllTasksAction = async () => {
	const tasks = (await getAllTasks()).map(task => ({
		...task,
		dueDate: format(task.dueDate, 'MM/dd/yyyy'),
	}));

	return tasks;
};
