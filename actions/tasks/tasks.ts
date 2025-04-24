'use server';

import { createNewTask, getAllTasks, getTaskById, updateTask } from '@/controllers/tasks/tasks';
import { TaskFormData, ParsedTask } from '@/interfaces/models/task.interface';
import { Response } from '@/interfaces/response.interface';
import { formatDate } from '@/utils/format-date';

export const getAllTasksAction = async (): Promise<Response<ParsedTask[]>> => {
	const { tasks, error } = await getAllTasks();

	if (error || !tasks) return { data: [], error };

	const parsedTasks = tasks.map(task => ({
		...task,
		dueDate: formatDate(task.dueDate),
	}));

	return { data: parsedTasks, message: 'Tasks retrieved successfully' };
};

export const createNewTaskAction = async (task: TaskFormData) => {
	const userId = 'd85b3c83-b68e-411d-aac8-c55794c4d21e';

	const { error, task: newTask } = await createNewTask(task, userId);

	if (error || !newTask) return { error };

	return {
		message: 'Task created successfully',
		data: { ...newTask, dueDate: formatDate(newTask.dueDate) },
	};
};

export const editTaskAction = async (taskId: string, task: TaskFormData) => {
	const userId = 'd85b3c83-b68e-411d-aac8-c55794c4d21e';

	const { error, task: updatedTask } = await updateTask(taskId, task, userId);

	if (error || !updatedTask) return { error };

	return {
		message: 'Task updated successfully',
		data: { ...updatedTask, dueDate: formatDate(updatedTask.dueDate) },
	};
};

export const getTaskByIdAction = async (
	taskId: string = '8f6c8704-b96d-4584-9d69-93bf0aa8d457'
) => {
	const userId = 'd85b3c83-b68e-411d-aac8-c55794c4d21e';

	const { error, task } = await getTaskById(taskId, userId);

	if (error || !task) return { error };

	return {
		message: 'Task retrieved successfully',
		data: { ...task, dueDate: formatDate(task.dueDate) },
	};
};
