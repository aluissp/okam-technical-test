import prisma from '@/lib/prisma';
import { Task } from '@/prisma/generated';
import { NewTask } from '@/interfaces/models/task.interface';

export const getAllTasks = async (): Promise<{ tasks?: Task[]; error?: string }> => {
	try {
		const tasks = await prisma.task.findMany();
		return { tasks };
	} catch (_error) {
		return { error: 'Error retrieving tasks' };
	}
};

export const createNewTask = async (
	task: NewTask,
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
