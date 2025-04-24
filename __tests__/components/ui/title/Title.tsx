import { Title } from '@/components/ui/title/Title';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Title component', () => {
	const title = 'Test Title';

	it('it should renders the title', () => {
		render(<Title title={title} />);

		const searchText = screen.getByText(title);
		expect(searchText).toBeInTheDocument();
	});
});
