'use client';

import { deleteTaskByIdAction } from '@/actions/tasks/tasks';

interface Props {
	taskId: string;
}

export const TaskDeleteButton = ({ taskId }: Props) => {
	return (
		<button
			onClick={() => deleteTaskByIdAction(taskId)}
			className='py-1 px-1 rounded cursor-not-allowed'
			disabled
		>
			Delete
		</button>
	);
};
