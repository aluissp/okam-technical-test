import { infer as Infer, object, string } from 'zod';

export const userRegisterSchema = object({
	name: string().min(3, { message: 'Name must be at least 3 characters long' }),
	email: string().email({ message: 'Invalid email address' }),
	password: string().min(8, { message: 'Password must be at least 8 characters long' }),
	organizationId: string().min(1, { message: 'Organization is required' }),
});

export const userLoginSchema = object({
	email: string()
		.email({ message: 'Invalid email address' })
		.min(1, { message: 'Email is required' }),
	password: string().min(1, { message: 'Password is required' }),
});

export type UserLogin = Infer<typeof userLoginSchema>;

export type UserRegister = Infer<typeof userRegisterSchema>;

export type User = UserRegister & { id: string; password?: string };
