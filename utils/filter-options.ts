export type FilterOptions = 'all' | 'completed' | 'deleted';

export const filterOptions: Record<FilterOptions, string> = {
	all: 'all',
	completed: 'completed',
	deleted: 'deleted',
};
