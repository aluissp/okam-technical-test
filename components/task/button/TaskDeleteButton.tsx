'use client';

import clsx from 'clsx';
import { activateTaskByIdAction, deleteTaskByIdAction } from '@/actions/tasks/tasks';
import { toast } from 'sonner';

interface Props {
	taskId: string;
	isDeleted: boolean;
}

export const TaskDeleteButton = ({ taskId, isDeleted }: Props) => {
	const handleToggle = async () => {
		let resp;

		if (isDeleted) {
			resp = await activateTaskByIdAction(taskId);
		} else {
			resp = await deleteTaskByIdAction(taskId);
		}

		const { error, message } = resp;

		if (error) toast.error(error);

		toast.success(message);
	};

	return (
		<button
			onClick={handleToggle}
			className={clsx('py-1 px-1 rounded', {
				'hover:bg-primary hover:text-white': isDeleted,
				'hover:bg-danger': !isDeleted,
			})}
		>
			{isDeleted ? 'Restore' : 'Delete'}
		</button>
	);
};
