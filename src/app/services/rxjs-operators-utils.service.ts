import { Injectable } from '@angular/core';
import {
  combineLatest,
  concat,
  concatMap,
  debounceTime,
  forkJoin,
  from,
  map,
  merge,
  mergeMap,
  Observable, of,
  startWith, switchMap
} from 'rxjs';
import {User} from '../models/user.model';
import {UserService} from './user.service';
import {FormControl} from '@angular/forms';
import {ProductsService} from './products.service';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class RxjsOperatorsUtilsService {

  constructor(private userService: UserService, private _productService: ProductsService) {
  }

  getUsersById(): void {
    this.userService.loadAllUsers().pipe(
      map((users: User[]) => {
          const filter1 = users.filter(user => user.id! > 0 && user.id! <= 5);
          const filter2 = users.filter(user => user.id! > 5 && user.id! <= 10);
          return [...filter1, ...filter2];
        }
      )
    ).subscribe(users => {
      console.log(users)});
  }

  useConcatOperator(): void {
    const obs1 = this.userService.getUsersByIds([1,2,3,4,5]);
    const obs2 = this.userService.getUsersByIds([6,7,8,9,10]);
    concat(obs1, obs2).subscribe(users => {
      console.log(users)
    })
  }

  useCombineLatest(): void {
    combineLatest([this.userService.loadAllUsers(), this.userService.loadAllPosts()]).pipe(
      map(([users, posts]) => {
        return users.map((user: User) => {
          const userPosts = posts.filter(post => post.userId === user.id)
          return {
            ...user, postsCount: userPosts.length
          }
        })
      })
    ).subscribe(results => {
      console.log(results)
    })
  }

  useCombineLatestWithCompanyAndCity(users$: Observable<User[]>, companyControl: FormControl, cityControl: FormControl): User[] | [] {
    combineLatest([
      users$,
      companyControl.valueChanges.pipe(startWith('')),
      cityControl.valueChanges.pipe(startWith(''))
    ]).pipe(
      debounceTime(300),
      map(([users, companyName, cityName]) => {
        return users.filter(user =>
          user.company?.name === companyName &&
          user.address?.city ===  cityName
        );
      })
    ).subscribe(results => {
      console.log(results, 'filtered users');
      return results;
    });
    return [];
  }

  useMerge() {
    const obs1 = this.userService.getUsersByIds([1,2,3,4,5]);
    const obs2 = this.userService.getUsersByIds([6,7,8,9,10]);
    merge(obs1, obs2).subscribe(users => {
      console.log(users)
    })
  }

  useConcatMap() {
    const userIds = [1,2,3]
    from(userIds).pipe(concatMap(id => this.userService.loadUser(id))
    ).subscribe(result => console.log(result))
  }

  getFullName(users$: Observable<User[]>) {
    users$.pipe(
      map(users => users.map(user => user.name))
    ).subscribe(result => {
      console.log(result);
    });
  }

  useMergeMap() {
    const userIds = [1,2,3];
    from(userIds).pipe(mergeMap(id => this.userService.loadUser(id))
    ).subscribe(result => console.log(result));
  }

  compareUsers(user1Id: number, user2Id: number): string {
    forkJoin({
      user1Posts: this.userService.getUsersByIds([user1Id]),
      user2Posts: this.userService.getUsersByIds([user2Id])
    }).subscribe(({user1Posts, user2Posts}) => {
      const count1 = user1Posts.length;
      const count2 = user2Posts.length;
      const result = count1 > count2 ?
        `User ${user1Id} has more posts (${count1} > ${count2})`
        : count1 < count2
          ? `User ${user2Id} has more posts (${count2} > ${count1})`
          : `Users have the same number of posts (${count1})`
      console.log(result)
      return result;
    })
    return '';
  }

  getProductsNames() {
    this._productService.loadAll().pipe(
      map(products => products.map(product => product.title))
    ).subscribe(result => {
      console.log(result);
    })
  }

  loadProductsWithSimultaniuosly(id1: number, id2: number, id3: number) {
    of(id1, id2, id3).pipe(
      mergeMap(ids => this._productService.load(ids))
    ).subscribe(result => {
      console.log(result);
    })
  }

  getThreeProductsAllResults(id1: number, id2: number, id3: number){
    forkJoin([
      this._productService.load(id1),
      this._productService.load(id2),
      this._productService.load(id3)
    ]).subscribe(result => {
      console.log(result);
    })
  }

  loadProductsOneByOne(id1: number, id2: number, id3: number) {
    of(id1, id2, id3).pipe(
      concatMap(ids => this._productService.load(ids))
    ).subscribe(result => {
      console.log(result);
    })
  }

  loadAllWithPriceMoreThan100(){
    this._productService.loadAll().pipe(
      map(products => products.filter(product => product.price>100))
    ).subscribe(result => {
      console.log(result);
    })
  }

  loadFirstNProduct(n: number): Product[] | []{
    this._productService.loadAll().pipe(
      map(products => products.splice(0, n))
    ).subscribe(result => {
      return result;
    })
    return []
  }

  loadCategories(categoryControl: FormControl){
      this._productService.loadAll().pipe(
        map(category => [...new Set(category.map(product => product.category))])
    ).subscribe(result => {
      categoryControl.setValue(result);
      console.log(categoryControl.value);
      })
  }

  getAllDataAtOnce() {
    forkJoin(
      this._productService.loadAll(),
      this._productService.loadAll().pipe(
        map(category => [...new Set(category.map(product => product.category))])
      ),
      this.userService.getUsersByIds([1,2,3])
    ).subscribe(result => {
      console.log(result);
    })}

}
