import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url.indexOf(config.apiUrl) > -1) {
            request = request.clone({
                setHeaders: { 
                    Authorization: config.token
                }
            });
        }

        return next.handle(request);
    }
}