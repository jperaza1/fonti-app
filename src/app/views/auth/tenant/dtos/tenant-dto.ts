export class TenantDto {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    faxNumber: string;
    address: string;
    suite: string;
    cityId: number;
    zipCode: string;
    webSite: string;
    logo: string;
    city: string;
    demo: boolean;
    demoTerminationDate: Date;
    isActive: boolean;
    permissions: string[];
}