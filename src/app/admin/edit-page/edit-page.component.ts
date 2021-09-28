import { ActivatedRoute, Params } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IPost } from 'src/app/shared/interafaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../shared/posts.service';
import { AlertService } from '../shared/services/alert.service';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  post?: IPost;
  isSending = false;
  signal = new Subject();

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private cd: ChangeDetectorRef,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getById(params.id);
        }),
      )
      .subscribe((post: IPost) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
        });

        this.cd.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.signal.next(true);
  }

  submit(): void {
    if (this.form.invalid || !this.post) {
      return;
    }

    this.isSending = true;

    this.postsService
      .update({
        ...this.post,
        ...this.form.value,
      })
      .pipe(takeUntil(this.signal))
      .subscribe(() => {
        this.isSending = false;
        this.alertService.success('Пост обновлен');
        this.cd.markForCheck();
      });
  }

  showError(inputName: string): boolean {
    const inputControl = this.form.get(inputName);
    return !!(inputControl?.touched && inputControl?.invalid);
  }
}
