import clsx from 'clsx';
import Link from 'next/link';
import { ParsedTask } from '@/interfaces/models/task.interface';
import { TaskDeleteButton } from '../button/TaskDeleteButton';

interface Props {
	tasks: ParsedTask[];
}
export const TaskTable = ({ tasks }: Props) => {
	return (
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
						owner
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
					<tr
						key={task.id}
						className={clsx('border-b bg-zinc-800 border-zinc-700 hover:bg-zinc-700', {
							'line-through text-danger': task.deleted,
						})}
					>
						<th scope='row' className='px-4 py-2 font-medium whitespace-nowrap text-white w-16'>
							{index + 1}
						</th>
						<td className='px-4 py-2'>{task.title}</td>
						<td className='px-4 py-2'>{task.user?.name}</td>
						<td className='px-4 py-2'>{task.dueDate}</td>
						<td className='px-4 py-2'>{task.completed ? 'Yes' : 'No'}</td>
						<td className='px-4 py-2'>
							<Link href={`/task/view-task/${task.id}`} className='hover:bg-info py-1 px-1 rounded'>
								View
							</Link>
						</td>
						<td className='px-4 py-2'>
							<Link
								href={`/task/edit-task/${task.id}`}
								className='hover:bg-primary py-1 px-1 rounded'
							>
								Edit
							</Link>
						</td>
						<td className='px-4 py-2'>
							<TaskDeleteButton taskId={task.id} isDeleted={task.deleted} />
						</td>
						<td className='px-4 py-2'>
							<Link
								href={`/task/history/${task.id}`}
								className='hover:bg-zinc-800 py-1 px-1 rounded'
							>
								History
							</Link>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
