import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { WebSocketTransactionDto } from './dtos/web-socket-transactions-dto';
import { AppComponentBase } from '../../../../AppComponentBase';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent extends AppComponentBase implements OnInit {

  WebSocketConnection: signalR.HubConnection;
  @Input() componentId: string;
  @Output() onTransaction = new EventEmitter<any>();
  @Input() unlock: boolean = false;
  @Input() ComponentKey: any;

  /**
   *
   */
  constructor(private _authenticationService: AuthenticationService,
    private _router: Router) {
    super();
  }

  ngOnInit(): void {
    this.createConnection();
  }

  createConnection() {

    let webSocketUrl = this.getConfiguration("WEB_SOCKET_URL");

    if (webSocketUrl == null || webSocketUrl == undefined)
      return;

    if (this.isEmptyOrNullString(webSocketUrl))
      return;

    webSocketUrl += "/socket";

    this.WebSocketConnection = new signalR.HubConnectionBuilder()
      .withUrl(webSocketUrl)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connectHub();

    this.WebSocketConnection.onclose(() => {
      this.connectHub();
    });

  }

  connectHub() {
    this.WebSocketConnection
      .start()
      .then(() => {
        this.onTransactionReceived();
      }).catch(() => { });
  }

  onInvokeTransaction(data: WebSocketTransactionDto) {
    this.WebSocketConnection
      .invoke("onExecuteTransaction", JSON.stringify(data))
      .then();
  }

  async onTransactionReceived() {

    this.WebSocketConnection.on("onTransactionReceived", (data: any) => {
      let transaction = JSON.parse(data) as WebSocketTransactionDto;

      switch (transaction.Transaction) {
        case "OFFERED":
          if (transaction.Key == this._authenticationService.currentUserValue.identity
            && transaction.ComponentIds.filter((value: string) => value.includes(this.componentId)).length > 0) {
            this.confirm("Offered Leg", "You have a new offer!", false, "Accept").then((result: any) => {
              this._router.navigate([transaction.Action]);
              this.onTransaction.emit(transaction);
            });
          }
          break;
        case 'UPDATE':
          if (transaction.ComponentIds.filter((value: string) => value.includes(this.componentId)).length > 0) {
            this.warning(transaction.Body, transaction.Subject);
            this.onTransaction.emit(transaction);
          }
          break;
        default:
          break;
      }
    });

  }
}