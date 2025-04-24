'use server';

import prisma from '@/lib/prisma';
import { Organization } from '@/interfaces/models/organization.interface';

export const getAllOrganization = async () => {
	const organizations: Organization[] = await prisma.organization.findMany({
		select: {
			id: true,
			name: true,
		},
	});

	return organizations;
};

export const getOrganizationById = async (id: string) => {
	const organization = await prisma.organization.findUnique({
		where: { id },
	});

	return organization;
};
