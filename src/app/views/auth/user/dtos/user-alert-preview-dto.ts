export class UserAlertPreviewDto {
    columns: DxColumnDto[];
    dataList: any[];
}

export class DxColumnDto {
    dataField: string;
    caption: string;
    cellTemplate: string;
    format: string;
}