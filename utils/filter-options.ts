export type FilterOptions = 'all' | 'completed' | 'deleted' | 'pending';

export const filterOptions: Record<FilterOptions, string> = {
	all: 'all',
	pending: 'pending',
	completed: 'completed',
	deleted: 'deleted',
};
