import Swal, { SweetAlertResult } from 'sweetalert2/dist/sweetalert2.js'
import DataSource from "devextreme/data/data_source";
import { formatCurrency, formatDate, formatNumber } from '@angular/common';
import { ConfigurationDto } from './views/gen/configuration/models/configuration-dto';
import Decimal from 'decimal.js';

export abstract class AppComponentBase {

	DisplayFormatDate: string = this.getConfiguration('FORMAT_DATE') ?? 'MM-dd-yyyy';

	DisplayFormatDateTime: string = this.getConfiguration('FORMAT_DATE_TIME') ?? 'MM-dd-yyyy HH:mm';

	DisplayFormatTime: string = this.getConfiguration('FORMAT_TIME') ?? "HH:mm";

	Currency: string = this.getConfiguration('SYMBOL_CURRENCY') ?? 'L';

  Percentage: string = this.getConfiguration('SYMBOL_PERCENTAGE') ?? '%';

	CountryCode: string = this.getConfiguration('COUNTRY_CODE') ?? 'en-US';

	PhoneFormat: string = this.getConfiguration('FORMAT_PHONE') ?? "9999-9999";

	MobilePhoneFormat: string = this.getConfiguration('FORMAT_PHONE') ?? "9999-9999";

	CurrencyDxNumber: string = `${this.Currency} #,##0.##;(${this.Currency} #,##0.##)`;
  CurrencyDxNumberWithThrees: string = `${this.Currency} #,##0.###;(${this.Currency} #,##0.###)`;

	PercentageDxNumber: string = `${this.Percentage} #,##0.##;(${this.Percentage} #,##0.##)`;

	ContainerMask: string = this.getConfiguration('CONTAINER_MASK') ?? "LLLL0000000";

	ChassisMask: string = this.getConfiguration('CHASSIS_MASK') ?? "LLLL0000";

	Lat: string = this.getConfiguration("ON_DUTY_MAP_COORDINATE_LAT");

	Lng: string = this.getConfiguration("ON_DUTY_MAP_COORDINATE_LNG");

  SSNFormat: string = this.getConfiguration("FORMAT_SSN") ?? "999-99-9999";
  EINFormat: string = this.getConfiguration("FORMAT_EIN") ?? "99-9999999";

	constructor() {
		this.DisplayFormatDate = this.getConfiguration('FORMAT_DATE') ?? 'MM-dd-yyyy';
		this.DisplayFormatDateTime = this.getConfiguration('FORMAT_DATE_TIME') ?? 'MM-dd-yyyy HH:mm';
		this.DisplayFormatTime = this.getConfiguration('FORMAT_TIME') ?? "HH:mm";
		this.PhoneFormat = this.getConfiguration('FORMAT_PHONE') ?? "9999-9999";
		this.MobilePhoneFormat = this.getConfiguration('FORMAT_PHONE') ?? "9999-9999";
		this.CurrencyDxNumber = `${this.Currency} #,##0.##;(${this.Currency} #,##0.##)`;
		this.CurrencyDxNumberWithThrees = `${this.Currency} #,##0.###;(${this.Currency} #,##0.###)`;
		this.PercentageDxNumber = `${this.Percentage} #,##0.##;(${this.Percentage} #,##0.##)`;
		this.ContainerMask = this.getConfiguration('CONTAINER_MASK') ?? "LLLL0000000";
		this.ChassisMask = this.getConfiguration('CHASSIS_MASK') ?? "LLLL0000";
		this.Lat = this.getConfiguration("ON_DUTY_MAP_COORDINATE_LAT");
		this.Lng = this.getConfiguration("ON_DUTY_MAP_COORDINATE_LNG");
    this.SSNFormat = this.getConfiguration("FORMAT_SSN") ?? "999-99-9999";
    this.EINFormat = this.getConfiguration("FORMAT_EIN") ?? "99-9999999";
	}
	public getConfiguration(key: string): string {
		let configurations = JSON.parse(localStorage.getItem('CONFIGURATIONS')) as ConfigurationDto[];
		if (configurations == null || configurations == undefined)
			return null;
		let configuration = configurations.find((config: ConfigurationDto) => config.key == key);
		return configuration?.value;
	}
	public isEmptyOrNullString(value: string): boolean {
		return value == undefined || value == null || value == "" || value.length == 0;
	}
	public isEmptyOrNullNumber(value: number) {
		return value == undefined || value == null || value <= 0;
	}

	calculateIsActiveDisplay(value) {
		return value ? 'ACTIVE' : 'INACTIVE';
	}

  roundTo(value: number, decimals: number): number {
    const decimal = new Decimal(value);
    return decimal.toDecimalPlaces(decimals, Decimal.ROUND_HALF_EVEN).toNumber();
  }

	success(title: string, message: string) {
		Swal.fire({
			type: "success",
			toast: true,
			text: message,
			title: title,
			position: 'bottom-right',
			timer: 3000
		});
	}
	successAsync(title: string, message: string): Promise<SweetAlertResult> {
		return Swal.fire(title, message, "success");
	}
	warning(title: string, message: string) {
		Swal.fire({
			type: "warning",
			toast: true,
			text: message,
			title: title,
			position: 'bottom-right',
			timer: 3000
		});
	}
	error(title: string, message: string) {
		Swal.fire({
			type: "error",
			toast: true,
			text: message,
			title: title,
			position: 'bottom-right',
			timer: 3000
		});
	}

  notification(title: string, message: string) {
		Swal.fire({
			type: "warning",
			toast: true,
			text: message,
			title: title,
			position: 'top-end',
      showConfirmButton: false,
			timer: 30000
		});
	}

	removeBlanks(value: string): string {
		if (this.isEmptyOrNullString(value))
			return value;
		return value.replace(/\s/g, '');
	}
	clone(obj: any): any {
		return JSON.parse(JSON.stringify(obj));
	}
	confirm(title?: string, message?: string, showCancel: boolean = true, confirmButtonText: string = "Yes", cancelButtonText: string = "Cancel"): Promise<SweetAlertResult> {
		return Swal.fire({
			title: this.isEmptyOrNullString(title) ? 'Are you sure to execute this action?' : title,
			text: this.isEmptyOrNullString(message) ? "" : message,
			showCancelButton: showCancel,
			confirmButtonColor: '#32a932',
			cancelButtonColor: '#d33',
			confirmButtonText: this.isEmptyOrNullString(confirmButtonText) ? "Yes" : confirmButtonText,
			cancelButtonText: this.isEmptyOrNullString(cancelButtonText) ? "Cancel" : cancelButtonText,
		});
	}
	confirmWithInput(title?: string, message?: string) {
		return Swal.fire({
			title: this.isEmptyOrNullString(title) ? 'Are you sure to execute this action?' : title,
			text: this.isEmptyOrNullString(message) ? "" : message,
			showCancelButton: true,
			confirmButtonColor: '#32a932',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Accept',
			input: "textarea"
		});
	}
	customConfirm(title?: string, message?: string, confirmText?: string, cancelText?: string): Promise<SweetAlertResult> {
		return Swal.fire({
			title: this.isEmptyOrNullString(title) ? 'Are you sure to execute this action?' : title,
			text: this.isEmptyOrNullString(message) ? "" : message,
			showCancelButton: true,
			confirmButtonColor: '#32a932',
			cancelButtonColor: '#d33',
			confirmButtonText: this.isEmptyOrNullString(confirmText) ? "Yes" : confirmText,
			cancelButtonText: this.isEmptyOrNullString(cancelText) ? "Cancel" : cancelText
		});
	}

	customizeTotalColumn = (data) => {
		return formatCurrency(data.value, this.CountryCode ?? 'en-US', this.Currency ?? '$');
	}
  customizePercentageColumn = (data) => {
		return `${data.value.toFixed(2)}%`;
	}
	//NO USAR, USAR TEMPLATE Y EL PIPE DE CURRENCY  {{   AMOUNT | currency : Currency }}
	dxCustomizeCurrency(column: any) {
		return `${formatCurrency(column.value, this.CountryCode ?? 'en-US', this.Currency ?? 'L')}`;
	}

	getCurrency(value: any) {
		return formatCurrency(value, this.CountryCode ?? 'en-US', this.Currency ?? '$');
	}

	CustomizeCurrency(number: any, locale: string, currency: string) {
		return formatCurrency(number, locale, currency);
	}

	CustomizeFormatDateTime(value: any) {
		if (value !== null) {
			return formatDate(value as Date, this.DisplayFormatDateTime, this.CountryCode ?? 'en-US');
		}
		return null;
	}

	CustomizeFormatDate(value: any) {
		if (value !== null) {
			return formatDate(value as Date, this.DisplayFormatDate, this.CountryCode);
		}
		return null;
	}

	dxCustomizeFormatDate(column: any) {
		return formatDate(column.value as Date, this.DisplayFormatDate, this.CountryCode ?? 'en-US');
	}

	dxCustomizeFormatDateTime(column: any) {
		return formatDate(column.value as Date, this.DisplayFormatDateTime, this.CountryCode ?? 'en-US');
	}

	dxCustomizeDecimal(column: any) {
		return formatNumber(column.value as number, this.CountryCode ?? 'en-US', '1.0-2')
	}

	dxOnRowPrepared(e: any) {
		e.rowElement.style.borderBottomColor = "#ababab";
		e.rowElement.style.borderBottomWidth = "2px";
	}

	getDataSourceDx(data: any[]): DataSource {
		return new DataSource({
			store: data,
			paginate: true,
			pageSize: 10
		});
	}

  formatInvoiceNumber(value: string | number): string {
    if (value == null) {
      return '';
    }

    // Convierte el valor a string
    let strValue = value.toString();

    // Asegúrate de que el valor tenga al menos 12 caracteres
    strValue = strValue.padStart(12, '0');

    // Formatea el valor en el formato deseado
    return `${strValue.slice(0, 3)}-${strValue.slice(3, 6)}-${strValue.slice(6, 8)}-${strValue.slice(8)}`;
  }

	any(array: any[], expression?: any | null) {
		return expression != null ? array.filter(expression).length > 0 : array.length > 0;
	}

	remove(array: any[], expression: any) {
		array.splice(array.findIndex(expression), 1);
	}

	getDate(any: any) {
		return new Date(any);
	}

  openPdfInNewTab(base64String: string, fileName: string = 'document.pdf') {
    try {
        // Remueve el prefijo si existe
        base64String = base64String.replace(/^data:application\/pdf;base64,/, '').trim();
        base64String = base64String.replace(/^"|"$/g, '');
        base64String = base64String.replace(/\s/g, '').trim();
        console.log("Caracteres no válidos encontrados:", base64String.match(/[^A-Za-z0-9+/=]/g));

        // Verifica caracteres inválidos
        const isValidBase64 = (str: string) => /^[A-Za-z0-9+/=]+$/.test(str);
        if (!isValidBase64(base64String)) {
            console.error("Cadena Base64 no válida.");
            return;
        }

        // Asegura que la longitud sea un múltiplo de 4
        base64String = base64String.padEnd(base64String.length + (4 - (base64String.length % 4)) % 4, '=');

        // Decodifica Base64
        const byteArray = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));

        // Crea un Blob
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        // Crea un enlace de descarga
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Abre el PDF en una nueva pestaña
        window.open(url);
    } catch (error) {
        console.error("Error al decodificar base64:", error);
    }
  }

  promptText(title?: string, message?: string, placeholder?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title: this.isEmptyOrNullString(title) ? 'Enter text' : title,
      text: this.isEmptyOrNullString(message) ? '' : message,
      input: 'text',
      inputPlaceholder: this.isEmptyOrNullString(placeholder) ? '' : placeholder,
      showCancelButton: true,
      confirmButtonColor: '#32a932',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Accept',
      cancelButtonText: 'Cancel'
    });
  }

}
