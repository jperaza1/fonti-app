export class TypeDto {
    id: number;
    code: string;
    name: string;
    typeGroupId: number;
    typeGroupName: string;
    fullName: string;
    isActive: boolean;
    /**
     *
     */
    constructor(id?: number, name?: string) {
        this.id = id;
        this.name = name;
    }
}
