import { IoAddOutline, IoAlbumsOutline, IoPersonOutline } from 'react-icons/io5';
import { NavbarItem } from './NavbarItem';
import { LogoutButton } from '../buttons/LogoutButton';

const navbarItems = [
	{ name: 'Tasks', href: '/', icon: <IoAlbumsOutline size={20} /> },
	{ name: 'Create new task', href: '/task/new-task', icon: <IoAddOutline size={20} /> },
	{
		name: 'Profile',
		href: '/user',
		icon: <IoPersonOutline size={20} />,
	},
];

export const Navbar = () => {
	return (
		<nav className='bg-navbar w-full py-4'>
			<div className='flex items-center justify-between max-w-7xl mx-auto'>
				{/* App name */}
				<div className='text-primary font-bold text-3xl'>Task Manager App</div>

				{/* Navbar options */}
				<div className='flex justify-between gap-2'>
					{navbarItems.map(item => (
						<NavbarItem key={item.href} {...item} />
					))}
					{/* Logout button */}
					<LogoutButton />
				</div>
			</div>
		</nav>
	);
};
