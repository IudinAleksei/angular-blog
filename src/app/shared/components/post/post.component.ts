import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPost } from '../../interafaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input() post!: IPost;
}
