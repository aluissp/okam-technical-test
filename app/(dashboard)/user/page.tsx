import { getUserSession } from '@/actions/auth';
import { getOrganizationById } from '@/actions/organization/organization';
import { Title } from '@/components/ui/title/Title';

export default async function UserPage() {
	const session = await getUserSession();

	const user = session?.user;

	const organizationId = user?.organizationId;

	const organization = await getOrganizationById(organizationId ?? '');

	return (
		<>
			<Title title='User data page' />

			<section>
				<p>Name: {user?.name}</p>
				<p>Email: {user?.email}</p>
				<p>Organization: {organization?.name}</p>
			</section>
		</>
	);
}
