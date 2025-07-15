import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../models/user.model';

@Pipe({
  name: 'filterByTitlePipe',
  standalone: false
})

export class FilterByTitlePipe implements PipeTransform {
  transform(posts: Post[], searchValue: string): Post[] {
    return posts.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase()));
  }
}
