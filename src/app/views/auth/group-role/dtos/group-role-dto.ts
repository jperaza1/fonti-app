import { GroupRolePermissionDto } from './group-role-permission-dto';

export class GroupRoleDto {
    id: number;
    groupHeaderId?: number;
    groupHeader: string;
    name: string;
    permissions: GroupRolePermissionDto[];
    isActive: boolean;
}