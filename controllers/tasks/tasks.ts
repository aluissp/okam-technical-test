import prisma from '@/lib/prisma';
import { History, Task, User } from '@/prisma/generated';
import { TaskFormData } from '@/interfaces/models/task.interface';
import { filterOptions, FilterOptions } from '@/utils/filter-options';

export const getAllTasks = async (
	organizationId: string,
	filter?: FilterOptions
): Promise<{ tasks?: Task[]; error?: string }> => {
	let whereClause;

	if (!filter) whereClause = { deleted: false };

	if (filter === filterOptions.all) whereClause = { deleted: false };
	else if (filter === filterOptions.completed) whereClause = { completed: true, deleted: false };
	else if (filter === filterOptions.deleted) whereClause = { deleted: true };

	try {
		// get all tasks by organizationId
		const userWithTasks = await prisma.user.findMany({
			where: { organizationId },
			select: { tasks: { where: whereClause } },
		});
		const tasks = userWithTasks.flatMap(user => user.tasks);
		return { tasks };
	} catch (_error) {
		return { error: 'Error retrieving tasks' };
	}
};

export const createNewTask = async (
	task: TaskFormData,
	userId: string
): Promise<{ task?: Task; error?: string }> => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			return { error: 'User not found' };
		}

		const dueDate = new Date(task.dueDate);

		if (isNaN(dueDate.getTime())) {
			return { error: 'Invalid date' };
		}

		const newTask = await prisma.task.create({
			data: {
				...task,
				dueDate,
				user: { connect: { id: userId } },
			},
		});
		return { task: newTask };
	} catch (_error) {
		return { error: 'Error creating task' };
	}
};

export const updateTask = async (
	taskId: string,
	task: TaskFormData,
	userId: string
): Promise<{ task?: Task; error?: string }> => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) return { error: 'User not found' };

		const existingTask = await prisma.task.findUnique({
			where: { id: taskId },
		});

		if (!existingTask) return { error: 'Task not found' };

		if (existingTask.deleted) return { error: 'Task is deleted' };

		// Check if the user is the owner of the task
		if (existingTask.userId !== userId) {
			return { error: 'You are not authorized to update this task' };
		}

		// Create histories of the changes
		const historiesPromises = Object.entries(task)
			.filter(([key, value]) => {
				return existingTask[key as keyof Task] !== value && key !== 'userId' && key !== 'deleted';
			})
			.map(([key, value]) => {
				return prisma.history.create({
					data: {
						taskId,
						field: key,
						oldValue: existingTask[key as keyof Task].toString(),
						newValue: value.toString(),
					},
				});
			});

		await Promise.all(historiesPromises);

		const dueDate = new Date(task.dueDate);

		if (isNaN(dueDate.getTime())) {
			return { error: 'Invalid date' };
		}

		// Update the task
		const updatedTask = await prisma.task.update({
			where: { id: taskId },
			data: {
				...task,
				dueDate,
				user: { connect: { id: userId } },
			},
		});

		return { task: updatedTask };
	} catch (_error) {
		return { error: 'Error updating task' };
	}
};

export const getTaskById = async (
	taskId: string,
	userId: string
): Promise<{ task?: Task & { user: User; histories: History[] }; error?: string }> => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			return { error: 'User not found' };
		}

		const task = await prisma.task.findUnique({
			where: { id: taskId },
			include: { user: true, histories: true },
		});

		if (!task) {
			return { error: 'Task not found' };
		}

		if (task.user.organizationId !== user.organizationId) {
			return { error: 'You are not authorized to view this task' };
		}

		return { task };
	} catch (_error) {
		return { error: 'Error retrieving task' };
	}
};

export const deleteTaskById = async (
	taskId: string,
	userId: string
): Promise<{ task?: Task & { user: User }; error?: string }> => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			return { error: 'User not found' };
		}

		const task = await prisma.task.findUnique({
			where: { id: taskId },
			include: { user: true },
		});

		if (!task) {
			return { error: 'Task not found' };
		}

		if (task.user.organizationId !== user.organizationId) {
			return { error: 'You are not authorized to delete this task' };
		}

		// Soft delete the task
		const deletedTask = await prisma.task.update({
			where: { id: taskId },
			data: { deleted: true },
		});

		if (!deletedTask) {
			return { error: 'Error deleting task' };
		}

		// Optionally, you can return the deleted task or a success message

		return { task };
	} catch (_error) {
		return { error: 'Error retrieving task' };
	}
};
