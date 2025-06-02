import { Component } from '@angular/core';
import {MessageLocalService} from '../../services/message-local.service';
import {MessageRootService} from '../../services/message-root.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  standalone: false
})
export class MessageComponent {
  newLocalMessage: string = '';
  newMessageInRoot: string = '';
  constructor(private messageLocal: MessageLocalService, private messageRoot: MessageRootService) {
  }
  get messageLoc() {
    return this.messageLocal.message;
  }
  get messageInRoot() {
    return this.messageRoot.message;
  }
  updateLocalMessage() {
    this.messageLocal.message = this.newLocalMessage;
  }
  updateRootMessage() {
    this.messageRoot.message = this.newMessageInRoot;
  }
}
