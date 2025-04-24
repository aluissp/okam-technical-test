import prisma from '@/lib/prisma';
import { Task } from '@/prisma/generated';
import { TaskFormData } from '@/interfaces/models/task.interface';

export const getAllTasks = async (): Promise<{ tasks?: Task[]; error?: string }> => {
	try {
		const tasks = await prisma.task.findMany();
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
			where: {
				id: userId,
			},
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
			where: {
				id: userId,
			},
		});

		if (!user) return { error: 'User not found' };

		const existingTask = await prisma.task.findUnique({
			where: {
				id: taskId,
			},
		});

		if (!existingTask) return { error: 'Task not found' };

		if (existingTask.deleted) return { error: 'Task is deleted' };

		// Check if the user is the owner of the task
		if (existingTask.userId !== userId) {
			return { error: 'You are not authorized to update this task' };
		}

		const dueDate = new Date(task.dueDate);

		if (isNaN(dueDate.getTime())) {
			return { error: 'Invalid date' };
		}

		// Update the task
		const updatedTask = await prisma.task.update({
			where: {
				id: taskId,
			},
			data: {
				...task,
				dueDate,
				user: { connect: { id: userId } },
			},
		});

		return { task: updatedTask };
	} catch (_error) {
		return { error: 'Error creating task' };
	}
};

export const getTaskById = async (
	taskId: string,
	userId: string
): Promise<{ task?: Task; error?: string }> => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
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
			return { error: 'You are not authorized to view this task' };
		}

		return { task };
	} catch (_error) {
		return { error: 'Error retrieving task' };
	}
};
