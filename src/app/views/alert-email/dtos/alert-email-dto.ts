import { AlertConfigurationLanguageDto } from "./alert-email-language-dto";

export class AlertEmailDto {
    id: number;
    name: string;
    bodyType: string;
    alertBy: string;

    notifyBefore: boolean;
    frequencyDaysBefore: number[];

    notifyAfter: boolean;
    frequencyDaysAfter: number[];

    languages: AlertConfigurationLanguageDto[];
    holidayDate?: Date;
    /**
    *
    */
    alertTypes: number[];
    customerTypes: number[];
    isActive: boolean;
    /**
     *
     */

    constructor() {
        this.alertTypes = [];
        this.customerTypes = [];
        this.notifyBefore = false;
        this.frequencyDaysBefore = [];

        this.notifyAfter = false;
        this.frequencyDaysAfter = [];

        this.languages = [];
        this.languages.push(new AlertConfigurationLanguageDto("Spanish"));
        this.languages.push(new AlertConfigurationLanguageDto("English"));
    }
}
