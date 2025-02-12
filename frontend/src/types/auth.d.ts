export type AuthStoreState = {
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	setTokens: (accessToken: string, refreshToken: string) => void;
	logout: () => void;
};
