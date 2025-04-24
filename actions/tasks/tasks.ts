'use server';

import { format } from 'date-fns';
import { createNewTask, getAllTasks } from '@/controllers/tasks/tasks';
import { NewTask, ParsedTask } from '@/interfaces/models/task.interface';
import { Response } from '@/interfaces/response.interface';

export const getAllTasksAction = async (): Promise<Response<ParsedTask[]>> => {
	const { tasks, error } = await getAllTasks();

	if (error || !tasks) return { data: [], error };

	const parsedTasks = tasks.map(task => ({
		...task,
		dueDate: format(task.dueDate, 'MM/dd/yyyy'),
	}));

	return { data: parsedTasks, message: 'Tasks retrieved successfully' };
};

export const createNewTaskAction = async (task: NewTask) => {
	const userId = 'd85b3c83-b68e-411d-aac8-c55794c4d21e';

	const { error, task: newTask } = await createNewTask(task, userId);

	if (error || !newTask) return { error, data: {} };

	return {
		message: 'Task created successfully',
		data: { ...newTask, dueDate: format(task.dueDate, 'MM/dd/yyyy') },
	};
};
