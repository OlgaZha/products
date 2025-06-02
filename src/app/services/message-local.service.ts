import { Injectable } from '@angular/core';

@Injectable()
export class MessageLocalService {
  message: string = 'Your initial message here from local';
  constructor() { }
}
