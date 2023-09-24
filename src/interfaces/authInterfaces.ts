export interface User {
	user_id: string;
	name: string;
	lastname: string;
	email: string;
	emailVerified: boolean;
	avatarUrl?: string;
}
