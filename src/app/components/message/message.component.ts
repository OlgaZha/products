import { Component } from '@angular/core';
import {MessageLocalService} from '../../services/message-local.service';
import {MessageRootService} from '../../services/message-root.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  providers: [MessageLocalService],
  imports: [FormsModule]
})
export class MessageComponent {
  constructor(private messageLocal: MessageLocalService, private messageRoot: MessageRootService) {
  }
  get messageLoc() {
    return this.messageLocal.message;
  }
  get messageInRoot() {
    return this.messageRoot.message;
  }

  set messageLoc(value: string) {
    this.messageLocal.message = value;
  }
  set messageInRoot(value: string) {
    this.messageRoot.message = value;
  }
}
