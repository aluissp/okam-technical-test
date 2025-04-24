'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Title } from '@/components/ui/title/Title';
import { NewTask, newTaskSchema } from '@/interfaces/models/task.interface';

export default function NewTaskPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<NewTask>({ resolver: zodResolver(newTaskSchema) });

	const handleCreateNewTask = async (data: NewTask) => {
		console.log('data', data);
	};
	return (
		<>
			<Title title='Create new task' />

			<form
				onSubmit={handleSubmit(handleCreateNewTask)}
				className='grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2'
			>
				<div className='flex flex-col mb-2'>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						className='p-2 border rounded-md bg-gray-200 text-dark'
						{...register('title')}
					/>
					{errors.title && (
						<span className='text-danger font-semibold'>{errors.title.message}</span>
					)}
				</div>

				<div className='flex flex-col mb-2'>
					<label htmlFor='description'>Description</label>
					<input
						type='text'
						className='p-2 border rounded-md bg-gray-200 text-dark'
						{...register('description')}
					/>
					{errors.description && (
						<span className='text-danger font-semibold'>{errors.description.message}</span>
					)}
				</div>

				<div className='flex flex-col mb-2'>
					<label htmlFor='dueDate'>Due date</label>
					<input
						type='date'
						className='p-2 border rounded-md bg-gray-200 text-dark'
						{...register('dueDate')}
					/>
					{errors.dueDate && (
						<span className='text-danger font-semibold'>{errors.dueDate.message}</span>
					)}
				</div>

				<div className='flex gap-2  mb-2 justify-start items-center'>
					<label htmlFor='completed'>Completed</label>
					<input
						type='checkbox'
						className='p-2 border rounded-md bg-gray-200 text-dark'
						{...register('completed')}
					/>
				</div>
				<div />
				<div className='flex justify-end mb-2 sm:mt-10'>
					<button
						type='submit'
						className='bg-primary rounded flex w-full sm:w-1/2 justify-center py-2'
					>
						Save
					</button>
				</div>
			</form>
		</>
	);
}
