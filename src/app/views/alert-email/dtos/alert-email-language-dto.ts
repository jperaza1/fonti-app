export class AlertConfigurationLanguageDto {
    languageType: string;
    bodyTemplate: string;
    bodyFields: string[];
    /**
     *
     */
    constructor(languageType?: string) {
        this.languageType = languageType;
        this.bodyFields = [];
    }
}