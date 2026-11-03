export class OptionButton {
  btnName: string;
  btnText: string;
  btnClass: string;
  btnIcon: string;
  permission: string[];
  disabled: boolean;
  /**
   *
   */
  constructor(btnName: string, btnText: string, btnClass: string = "btn btn-default", btnIcon: string, permission?: string[]) {
    this.btnClass = btnClass;
    this.btnIcon = btnIcon;
    this.btnName = btnName;
    this.btnText = btnText;
    this.permission = permission;
    this.disabled = false;
  }
}
