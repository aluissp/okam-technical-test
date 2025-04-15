import prisma from '../lib/prisma';
import { initialData } from './seed';

const main = async () => {
	// 1. Delete previous registers
	await prisma.history.deleteMany();
	await prisma.task.deleteMany();
	await prisma.user.deleteMany();
	await prisma.organization.deleteMany();

	// 2. Get initial data
	const { organizations, users, tasks, histories } = initialData;

	// 3. Create organizations
	await prisma.organization.createMany({
		data: organizations,
	});

	// 4. Create users
	const org1 = await prisma.organization.findFirst({
		where: { name: 'Organization 1' },
	});
	const org2 = await prisma.organization.findFirst({
		where: { name: 'Organization 2' },
	});

	await prisma.user.createMany({
		data: [
			{ ...users[0], organizationId: org1!.id },
			{ ...users[1], organizationId: org1!.id },
			{ ...users[2], organizationId: org2!.id },
		],
	});

	const luis = await prisma.user.findFirst({
		where: { name: 'Luis Perugachi' },
	});
	const maite = await prisma.user.findFirst({
		where: { name: 'Maite Perugachi' },
	});

	const tupac = await prisma.user.findFirst({
		where: { name: 'Tupac Moran' },
	});

	// 5. Create tasks
	const task1 = await prisma.task.create({
		data: {
			...tasks[0],
			userId: luis!.id,
		},
	});
	await prisma.task.create({
		data: {
			...tasks[1],
			userId: luis!.id,
		},
	});
	await prisma.task.create({
		data: {
			...tasks[2],
			userId: maite!.id,
		},
	});
	await prisma.task.create({
		data: {
			...tasks[3],
			userId: tupac!.id,
		},
	});

	// 6. Create histories
	const newHistories = histories.map(history => ({ ...history, taskId: task1.id }));

	await prisma.history.createMany({
		data: newHistories,
	});

	console.log('Seeding completed');
};

(() => {
	if (process.env.NODE_ENV === 'production') return;

	main();
})();
