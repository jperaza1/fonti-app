import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';

@Directive({
  selector: '[appCanAccess]'
})
export class CanAccessDirective implements OnInit {

  @Input('appCanAccess') canAccess: string[];

  constructor(public el: ElementRef, private authorize: AuthenticationService) {
  }

  ngOnInit(): void {
    let isInRole = this.authorize.IsInRoleList(this.canAccess);
    if (!isInRole)
      this.el.nativeElement.style.display = 'none';
  }

}
