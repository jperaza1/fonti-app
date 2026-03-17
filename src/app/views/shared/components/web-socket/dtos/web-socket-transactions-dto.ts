export class WebSocketTransactionDto {
    ComponentIds: string[];
    Transaction: string;
    Subject: string;
    Body: string;
    User: string;
    Key: string;
    Action: string;
    /**
     *
     */
    constructor(ComponentIds?: string[], Transaction?: string, Subject?: string, Body?: string, User?: string, Key?: string) {
        this.ComponentIds = ComponentIds;
        this.Transaction = Transaction;
        this.Subject = Subject;
        this.Body = Body;
        this.User = User;
        this.Key = Key;
    }
}