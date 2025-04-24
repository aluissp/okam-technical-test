'use client';

import clsx from 'clsx';
import { deleteTaskByIdAction } from '@/actions/tasks/tasks';
import { toast } from 'sonner';

interface Props {
	taskId: string;
	isDeleted: boolean;
}

export const TaskDeleteButton = ({ taskId, isDeleted }: Props) => {
	const handleDelete = async () => {
		const { error, message } = await deleteTaskByIdAction(taskId);

		if (error) toast.error(error);

		toast.success(message);
	};

	return (
		<button
			onClick={handleDelete}
			className={clsx('py-1 px-1 rounded hover:bg-danger', {
				'cursor-not-allowed hover:bg-transparent': isDeleted,
			})}
			disabled={isDeleted}
		>
			Delete
		</button>
	);
};
