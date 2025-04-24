import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AlertToaster } from '@/components/ui/alert/AlertToaster';
import AuthProvider from '@/components/auth/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Task manager',
	description: 'This app allows you to manage your tasks',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<AuthProvider>
			<html lang='en'>
				<body className={`${inter.className} antialiased`}>
					{children}

					<AlertToaster />
				</body>
			</html>
		</AuthProvider>
	);
}
