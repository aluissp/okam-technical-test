import {
	IoAlbumsOutline,
	IoCheckmarkOutline,
	IoTimerOutline,
	IoTrashOutline,
} from 'react-icons/io5';
import { NavbarItem } from '../../ui/navbar';
import { filterOptions } from '@/utils/filter-options';

const navbarItems = [
	{ name: 'All tasks', href: `/?filter=${filterOptions.all}`, icon: <IoAlbumsOutline size={15} /> },
	{
		name: 'Completed tasks',
		href: `/?filter=${filterOptions.completed}`,
		icon: <IoCheckmarkOutline size={15} />,
	},
	{
		name: 'Pending tasks',
		href: `/?filter=${filterOptions.pending}`,
		icon: <IoTimerOutline size={15} />,
	},
	{
		name: 'Deleted tasks',
		href: `/?filter=${filterOptions.deleted}`,
		icon: <IoTrashOutline size={15} />,
	},
];

export const TableNavbar = () => {
	return (
		<div className='flex items-end justify-center gap-3 text-base'>
			{navbarItems.map(item => (
				<NavbarItem key={item.href} {...item} />
			))}
		</div>
	);
};
