import {Component, Input, TemplateRef} from '@angular/core';
import {Post} from '../../models/user.model';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrl: './post-preview.component.scss',
  standalone: false
})
export class PostPreviewComponent {
  @Input() post!: Post;
  @Input() template!: TemplateRef<any>;
}
