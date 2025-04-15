import { User } from './models/user.interface';

export interface AuthLoginResponse {
	ok: boolean;
	message: string;
}

export type AuthRegisterResponse = AuthLoginResponse & { user?: User };
