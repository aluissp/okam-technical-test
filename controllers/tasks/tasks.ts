import prisma from '@/lib/prisma';
import { Task } from '@/prisma/generated';

export const getAllTasks = async (): Promise<Task[]> => {
	const tasks = await prisma.task.findMany();
	return tasks;
};
