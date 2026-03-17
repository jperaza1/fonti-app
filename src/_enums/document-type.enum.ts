export class DocumentTypeOption {

    public static TaxId: number = 1;
    public static SocialSecurity: number = 2;

    public static mask(type: number): string {
        switch (type) {
            case DocumentTypeOption.TaxId:
                return "99-9999999";
            case DocumentTypeOption.SocialSecurity:
                return "999-99-9999";
            default:
                return "";
        }
    }
}