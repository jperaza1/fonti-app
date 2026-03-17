export class RoleDto {
    id: number;
    name: string;
    description: string;
    permissions: string[];
    isActive: boolean;
    /**
     *
     */
    constructor() {
        this.permissions = [];
    }
}