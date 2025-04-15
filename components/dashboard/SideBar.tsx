import { NavLinks } from './NavLinks';
import { LogoutButton } from './buttons/LogoutButton';

export const SideBar = () => {
	return (
		<div className='flex h-full flex-col px-3 py-4 md:px-2'>
			{/* Title box */}
			<div className='mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40 text-white font-bold text-xl'>
				Task Manager App
			</div>

			{/* SideBar options */}
			<div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
				<NavLinks />

				<div className='hidden h-auto w-full grow rounded-md bg-gray-50 md:block' />

				{/* Logout button */}
				<LogoutButton />
			</div>
		</div>
	);
};
