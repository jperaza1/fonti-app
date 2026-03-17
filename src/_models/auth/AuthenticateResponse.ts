export class AuthenticateResponse {
    success: boolean;
    errorMessage: string;
    token: string;
    expiration: Date;
    userAuth: UserAuthenticateResponse;
}
export class UserAuthenticateResponse {
    fullName: string;
    firstName: string;
    lastName: string;
    tenantName: string;
    tenantId: number;
    expiration: Date;
    userType: number;
	  identity: string;
    cafeteriaId: number;
    permissions: string[];
}