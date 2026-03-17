import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    /**
     * Holds the shared reference of the subject.
     */
    public _OnMessageReceivedSubject: Subject<string>;

    public constructor() {
        // Creates a new subject.
        this._OnMessageReceivedSubject = new Subject<string>();
    }

    /**
    * emits a message. 
    */
    public emitMessageReceived(msg: string): void {
        this._OnMessageReceivedSubject.next(msg);
    }
}