import { EditTaskInfo } from '@/components/task/EditTaskInfo';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('<EditTaskInfo />', () => {
	const task = {
		completed: false,
		createdAt: new Date(),
		deleted: false,
		id: '1',
		userId: '1',
		updatedAt: new Date(),
		title: 'Test Task',
		description: 'Test Description',
		dueDate: new Date().toString(),
	};

	it('it should there a 3 <a/> elements', () => {
		const { container } = render(<EditTaskInfo task={task} />);

		expect(container).toMatchSnapshot();
	});
});
