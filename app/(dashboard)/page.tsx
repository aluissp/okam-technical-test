import { Title } from '@/components/ui/title/Title';
import { IoSearchOutline } from 'react-icons/io5';

export default function DashboardPage() {
	return (
		<>
			<Title title='Tasks list' />

			{/* Task table */}
			<div className='flex justify-between items-center flex-col sm:flex-row gap-4 my-4 text-lg'>
				{/* Search  */}
				<div className='relative w-full sm:w-auto'>
					<IoSearchOutline size={20} className='absolute top-2 left-2 text-dark' />
					<input
						type='text'
						placeholder='Search a task'
						className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-2 text-dark placeholder:text-dark focus:outline-none focus:border-primary'
					/>
				</div>

				<div className='flex items-end justify-center gap-2'>
					<p className='font-bold'>Filtrar por: </p>

					<select name='select' className='pb-0.5'>
						<option value='value1' className='text-black' selected>
							Value 1
						</option>
						<option value='value2' className='text-black'>
							Value 2
						</option>
						<option value='value3' className='text-black'>
							Value 3
						</option>
					</select>
				</div>
			</div>
		</>
	);
}
