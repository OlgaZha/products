import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageRootService {
  message: string = 'Your initial message here from root service';
  constructor() { }
}
