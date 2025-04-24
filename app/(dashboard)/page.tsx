import Link from 'next/link';
import { Title } from '@/components/ui/title/Title';
import { getAllTasksAction } from '@/actions/tasks/tasks';

export default async function DashboardPage() {
	const { data: tasks } = await getAllTasksAction();

	return (
		<>
			{/* Task table header */}
			<div className='flex justify-between items-center flex-col sm:flex-row gap-4 my-4 text-lg'>
				<Title title='Tasks list' />

				<div className='flex items-end justify-center gap-3 text-base'>
					<Link href='#'>All tasks</Link>
					<Link href='#'>Completed tasks</Link>
					<Link href='#'>Deleted tasks</Link>
				</div>
			</div>

			{/* Table */}
			<div className='overflow-x-auto shadow-md rounded-md'>
				<table className='w-full text-sm text-left rtl:text-right text-gray-300 '>
					<thead className='text-xs uppercase bg-zinc-700'>
						<tr>
							<th scope='col' className='px-4 py-3 min-w-[75px]'>
								#
							</th>
							<th scope='col' className='px-4 py-3 min-w-28'>
								title
							</th>
							<th scope='col' className='px-4 py-3 min-w-28'>
								due date
							</th>
							<th scope='col' className='px-4 py-3 min-w-28'>
								completed
							</th>
							<th scope='col' className='px-4 py-3' colSpan={4}></th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task, index) => (
							<tr key={task.id} className='border-b bg-zinc-800 border-zinc-700 hover:bg-zinc-700'>
								<th scope='row' className='px-4 py-2 font-medium whitespace-nowrap text-white w-16'>
									{index + 1}
								</th>
								<td className='px-4 py-2'>{task.title}</td>
								<td className='px-4 py-2'>{task.dueDate}</td>
								<td className='px-4 py-2'>{task.completed ? 'Yes' : 'No'}</td>
								<td className='px-4 py-2'>
									<Link href='#' className='hover:bg-info py-1 px-1 rounded'>
										View
									</Link>
								</td>
								<td className='px-4 py-2'>
									<Link href='#' className='hover:bg-primary py-1 px-1 rounded'>
										Edit
									</Link>
								</td>
								<td className='px-4 py-2'>
									<Link href='#' className='hover:bg-danger py-1 px-1 rounded'>
										Delete
									</Link>
								</td>
								<td className='px-4 py-2'>
									<Link href='#' className='hover:bg-zinc-800 py-1 px-1 rounded'>
										History
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
