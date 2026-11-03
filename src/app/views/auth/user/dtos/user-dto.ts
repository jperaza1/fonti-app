export class UserDto {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    extension: string;
    userType: number;
    userTypeText: number;
    driverId: number;
    dispatcherId: number;
    customerId: number;
    id: number;
    changeUsername: boolean;
    newUserName: string;
    changePassword: boolean;
    newPassword: string;
    isActive: boolean;
    roleIds: number[];
    routes: number[];
    userCharts: number[];
    userAlerts: number[];
    userId: string;
    /**
     *
     */
    constructor() {
        this.roleIds = [];
        this.routes = [];
    }
}
