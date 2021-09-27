import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IAlert } from 'src/app/shared/interafaces';

@Injectable()
export class AlertService {
  public alert$ = new Subject<IAlert>();

  success(text: string): void {
    this.alert$.next({ type: 'success', text });
  }

  warning(text: string): void {
    this.alert$.next({ type: 'warning', text });
  }

  danger(text: string): void {
    this.alert$.next({ type: 'danger', text });
  }
}
