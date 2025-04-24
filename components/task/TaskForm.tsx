'use client';

import { useTask } from '@/hooks/useTask';
import { ParsedTask } from '@/interfaces/models/task.interface';
import clsx from 'clsx';

interface Props {
	task?: ParsedTask;
}

export const TaskForm = ({ task }: Props) => {
	const { errors, handleSubmittedTask, register } = useTask(task);

	return (
		<form onSubmit={handleSubmittedTask} className='grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2'>
			<div className='flex flex-col mb-2'>
				<label htmlFor='title'>Title</label>
				<input
					id='title'
					type='text'
					className='p-2 border rounded-md bg-gray-200 text-dark'
					disabled={task?.deleted}
					{...register('title')}
				/>
				{errors.title && <span className='text-danger font-semibold'>{errors.title.message}</span>}
			</div>

			<div className='flex flex-col mb-2'>
				<label htmlFor='description'>Description</label>
				<input
					id='description'
					type='text'
					className='p-2 border rounded-md bg-gray-200 text-dark'
					disabled={task?.deleted}
					{...register('description')}
				/>
				{errors.description && (
					<span className='text-danger font-semibold'>{errors.description.message}</span>
				)}
			</div>

			<div className='flex flex-col mb-2'>
				<label htmlFor='dueDate'>Due date</label>
				<input
					id='dueDate'
					type='date'
					value={task?.dueDate}
					className='p-2 border rounded-md bg-gray-200 text-dark'
					disabled={task?.deleted}
					{...register('dueDate')}
				/>
				{errors.dueDate && (
					<span className='text-danger font-semibold'>{errors.dueDate.message}</span>
				)}
			</div>

			<div className='flex gap-2  mb-2 justify-start items-center'>
				<label htmlFor='completed'>Completed</label>
				<input
					id='completed'
					type='checkbox'
					className='p-2 border rounded-md bg-gray-200 text-dark'
					disabled={task?.deleted}
					{...register('completed')}
				/>
			</div>
			<div />
			<div className='flex justify-end mb-2 sm:mt-10'>
				<button
					type='submit'
					disabled={task?.deleted}
					className={clsx('bg-primary rounded flex w-full sm:w-1/2 justify-center py-2', {
						'opacity-50 cursor-not-allowed': task?.deleted,
					})}
				>
					Save
				</button>
			</div>
		</form>
	);
};
