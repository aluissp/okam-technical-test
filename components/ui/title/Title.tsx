interface Props {
	title: string;
	className?: string;
}

export const Title = ({ title, className }: Props) => {
	return <h1 className={`text-2xl font-semibold ${className ?? ''}`}>{title}</h1>;
};
