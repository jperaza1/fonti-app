export class PermissionGroupedDto {
    permissionId: string;
    normalizedName: string;
    displayName: string;
    parent: string;
    isChild: boolean;
    children: PermissionGroupedDto[];
}