import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 5000;

  text = '';
  type = 'success';

  private sub?: Subscription;

  constructor(private alertService: AlertService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.sub = this.alertService.alert$.subscribe((alert) => {
      this.text = alert.text;
      this.type = alert.type;
      this.cd.markForCheck();

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
        this.cd.markForCheck();
      }, this.delay);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
