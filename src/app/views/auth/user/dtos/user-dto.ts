export class UserDto {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
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
    userCharts: number[];
    userAlerts: number[];
    cafeteriaId: number;
    cafeteria: string;
    userId: string;
    /**
     *
     */
    constructor() {
        this.roleIds = [];
    }
}
