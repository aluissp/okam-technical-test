'use client';

import clsx from 'clsx';
import { deleteTaskByIdAction } from '@/actions/tasks/tasks';

interface Props {
	taskId: string;
	isDeleted: boolean;
}

export const TaskDeleteButton = ({ taskId, isDeleted }: Props) => {
	return (
		<button
			onClick={() => deleteTaskByIdAction(taskId)}
			className={clsx('py-1 px-1 rounded hover:bg-danger', {
				'cursor-not-allowed hover:bg-transparent': isDeleted,
			})}
			disabled={isDeleted}
		>
			Delete
		</button>
	);
};
