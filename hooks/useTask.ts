import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { redirect } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNewTaskAction, editTaskAction } from '@/actions/tasks/tasks';
import { TaskFormData, newTaskSchema, ParsedTask } from '@/interfaces/models/task.interface';

export const useTask = (task?: ParsedTask) => {
	const defaultValues: TaskFormData = {
		title: task?.title ?? '',
		description: task?.description ?? '',
		dueDate: task?.dueDate ?? '',
		completed: task?.completed ?? false,
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskFormData>({ resolver: zodResolver(newTaskSchema), defaultValues });

	const handleSubmittedTask = async (data: TaskFormData) => {
		let response;

		if (task && task.id) {
			response = await editTaskAction(task.id, data);
		} else {
			response = await createNewTaskAction(data);
		}

		const { error, message } = response;

		if (error) {
			toast.error(error);
			return;
		}

		toast.success(message);
		redirect('/');
	};

	return {
		// Values
		errors,

		// Handlers
		register,
		handleSubmittedTask: handleSubmit(handleSubmittedTask),
	};
};
