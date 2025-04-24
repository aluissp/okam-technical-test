'use server';

import {
	createNewTask,
	deleteTaskById,
	getAllTasks,
	getTaskById,
	updateTask,
} from '@/controllers/tasks/tasks';
import { TaskFormData, ParsedTask } from '@/interfaces/models/task.interface';
import { Response } from '@/interfaces/response.interface';
import { FilterOptions } from '@/utils/filter-options';
import { formatDate } from '@/utils/format-date';
import { revalidatePath } from 'next/cache';
import { getUserSession } from '../auth';

export const getAllTasksAction = async (filter: FilterOptions): Promise<Response<ParsedTask[]>> => {
	const { tasks, error } = await getAllTasks(filter);

	if (error || !tasks) return { data: [], error };

	const parsedTasks = tasks.map(task => ({
		...task,
		dueDate: formatDate(task.dueDate),
	}));

	return { data: parsedTasks, message: 'Tasks retrieved successfully' };
};

export const createNewTaskAction = async (task: TaskFormData) => {
	const session = await getUserSession();
	const userId = session?.user?.id;

	const { error, task: newTask } = await createNewTask(task, userId!);

	if (error || !newTask) return { error };

	return {
		message: 'Task created successfully',
		data: { ...newTask, dueDate: formatDate(newTask.dueDate) },
	};
};

export const editTaskAction = async (taskId: string, task: TaskFormData) => {
	const session = await getUserSession();
	const userId = session?.user?.id;

	const { error, task: updatedTask } = await updateTask(taskId, task, userId!);

	if (error || !updatedTask) return { error };

	return {
		message: 'Task updated successfully',
		data: { ...updatedTask, dueDate: formatDate(updatedTask.dueDate) },
	};
};

export const getTaskByIdAction = async (taskId: string) => {
	const session = await getUserSession();
	const userId = session?.user?.id;

	const { error, task } = await getTaskById(taskId, userId!);

	if (error || !task) return { error };

	return {
		message: 'Task retrieved successfully',
		data: { ...task, dueDate: formatDate(task.dueDate) },
	};
};

export const deleteTaskByIdAction = async (taskId: string) => {
	const session = await getUserSession();
	const userId = session?.user?.id;

	const { error, task } = await deleteTaskById(taskId, userId!);

	revalidatePath('/');

	if (error || !task) return { error };

	return {
		message: 'Task deleted successfully',
		data: { ...task, dueDate: formatDate(task.dueDate) },
	};
};
