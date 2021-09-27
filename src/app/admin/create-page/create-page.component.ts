import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../shared/services/alert.service';
import { PostsService } from '../../shared/posts.service';
import { IPost } from '../../shared/interafaces';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  form!: FormGroup;

  constructor(private postsService: PostsService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const post: IPost = {
      ...this.form.value,
      date: new Date(),
    };

    this.postsService.create(post).subscribe(() => {
      this.form.reset();
      this.alertService.success('Пост успешно создан');
    });
  }

  showError(inputName: string): boolean {
    const inputControl = this.form.get(inputName);
    return !!(inputControl?.touched && inputControl?.invalid);
  }
}
