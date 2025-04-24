import { Title } from '@/components/ui/title/Title';
import { getAllTasksAction } from '@/actions/tasks/tasks';
import { TableNavbar } from '@/components/task/table/TableNavbar';
import { TaskTable } from '@/components/task/table/TaskTable';
import { FilterOptions } from '@/utils/filter-options';

interface Props {
	searchParams: Promise<{ filter: FilterOptions }>;
}

export default async function DashboardPage({ searchParams }: Props) {
	const { filter } = await searchParams;

	const { data: tasks } = await getAllTasksAction(filter);

	return (
		<>
			{/* Task table header */}
			<div className='flex justify-between items-center flex-col sm:flex-row gap-4 my-4 text-lg'>
				<Title title='Tasks list' />

				<TableNavbar />
			</div>

			{/* Table */}
			<div className='overflow-x-auto shadow-md rounded-md'>
				<TaskTable tasks={tasks} />
			</div>
		</>
	);
}
