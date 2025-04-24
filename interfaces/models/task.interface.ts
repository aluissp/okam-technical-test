import { Task, User } from '@/prisma/generated';
import { boolean, infer as Infer, object, string } from 'zod';

export const newTaskSchema = object({
	title: string().min(3, { message: 'Title must be at least 3 characters long' }),
	description: string().min(5, { message: 'Description must be at least 5 characters long' }),
	dueDate: string().refine(
		date => {
			const dateObj = new Date(date);
			return !isNaN(dateObj.getTime());
		},
		{ message: 'Please select a valid date' }
	),
	completed: boolean(),
});

export type TaskFormData = Infer<typeof newTaskSchema> & {
	deleted?: boolean;
};

export type ParsedTask = Omit<Task, 'dueDate'> & {
	dueDate: string;
	user?: User;
};
