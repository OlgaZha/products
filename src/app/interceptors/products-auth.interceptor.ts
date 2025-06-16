import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

Injectable()

export class ProductsAuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.includes('/products')) {
      const modifiedReq = req.clone({
        headers: req.headers.set('authorization', 'my token')
      })
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}
