import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';

@Directive({
  selector: '[appCanNotAccess]'
})
export class CanNotAccessDirective implements OnInit {

  @Input('appCanNotAccess') canAccess: string[];

  constructor(public el: ElementRef, private authorize: AuthenticationService) {
  }

  ngOnInit(): void {
    let isInRole = this.authorize.IsInRoleList(this.canAccess);
    if (isInRole)
      this.el.nativeElement.style.display = 'none';
  }

}
