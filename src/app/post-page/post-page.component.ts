import { ActivatedRoute, Params } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { PostsService } from '../shared/posts.service';
import { IPost } from '../shared/interafaces';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPageComponent implements OnInit {
  post$!: Observable<IPost>;
  constructor(private postsService: PostsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params.id);
      }),
    );
  }
}
