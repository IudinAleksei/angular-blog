import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from '../../shared/interafaces';
import { PostsService } from '../../shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  subs: Subscription[] = [];
  searchStr = '';

  constructor(private postsService: PostsService, private cd: ChangeDetectorRef, private alertService: AlertService) {}

  ngOnInit(): void {
    this.subs.push(
      this.postsService.getAll().subscribe((posts) => {
        this.posts = posts;
        this.cd.markForCheck();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  remove(id = ''): void {
    this.subs.push(
      this.postsService.remove(id).subscribe(() => {
        this.posts = this.posts.filter((post) => post.id !== id);
        this.alertService.danger('Пост удален');
        this.cd.markForCheck();
      }),
    );
  }
}
