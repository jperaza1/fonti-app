import { UserTypeEnum } from "../_enums/user-type.enum";

export class User {
	fullName: string;
	firstName: string;
	lastName: string;
	tenantName: string;
	tenantId: number;
	expiration: Date;
	permissions: string[];
	token: string;
	userType: UserTypeEnum;
	identity: string;
	cafeteriaId: number;
	routes: number[];
}