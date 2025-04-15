import bcrypt from 'bcryptjs';

interface SeedUser {
	name: string;
	email: string;
	password: string;
}

interface SeedOrganization {
	name: string;
}

interface SeedTask {
	title: string;
	description: string;
	dueDate: Date;
	completed: boolean;
	deleted: boolean;
}

interface SeedHistory {
	field: string;
	oldValue: string;
	newValue: string;
}

interface SeedData {
	organizations: SeedOrganization[];
	users: SeedUser[];
	tasks: SeedTask[];
	histories: SeedHistory[];
}

export const initialData: SeedData = {
	organizations: [{ name: 'Organization 1' }, { name: 'Organization 2' }],
	users: [
		{
			name: 'Luis Perugachi',
			email: 'luisprg05@gmail.com',
			password: bcrypt.hashSync('test1234', 10),
		},
		{
			name: 'Maite Perugachi',
			email: 'maite@gmail.com',
			password: bcrypt.hashSync('test1234', 10),
		},
		{
			name: 'Tupac Moran',
			email: 'tupac@gmail.com',
			password: bcrypt.hashSync('test1234', 10),
		},
	],
	tasks: [
		{
			title: 'Learn TypeScript',
			description: 'Learn TypeScript using the official documentation',
			dueDate: new Date('2025-04-15'),
			completed: false,
			deleted: false,
		},
		{
			title: 'Buy groceries',
			description: 'Buy groceries for the week',
			dueDate: new Date('2025-04-14'),
			completed: true,
			deleted: false,
		},
		{
			title: 'Read a book',
			description: 'Read a book about the history of Ecuador',
			dueDate: new Date('2025-04-13'),
			completed: false,
			deleted: true,
		},
		{
			title: 'Go to the gym',
			description: 'Go to the gym and do some exercise',
			dueDate: new Date('2025-05-12'),
			completed: false,
			deleted: false,
		},
	],
	histories: [
		{
			field: 'title',
			oldValue: 'Learn React',
			newValue: 'Learn TypeScript',
		},
		{
			field: 'description',
			oldValue: 'Learn React using the official documentation',
			newValue: 'Learn TypeScript using the official documentation',
		},

		{
			field: 'dueDate',
			oldValue: '2025-04-10',
			newValue: '2025-04-15',
		},
	],
};
