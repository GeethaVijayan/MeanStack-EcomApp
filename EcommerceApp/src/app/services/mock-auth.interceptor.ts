import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MockAuthBackendService } from './mock-auth-backend.service';

@Injectable()
export class MockAuthInterceptor implements HttpInterceptor {
  constructor(private mockAuthBackend: MockAuthBackendService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = request;

    // Intercept register requests
    if (url.includes('/auth/register') && method === 'POST') {
      try {
        const result = this.mockAuthBackend.register(body.email, body.password, body.name);
        return of(new HttpResponse({ status: 200, body: result }));
      } catch (error: any) {
        return of(new HttpResponse({ 
          status: 400, 
          body: { message: error.message } 
        }));
      }
    }

    // Intercept login requests
    if (url.includes('/auth/login') && method === 'POST') {
      try {
        const result = this.mockAuthBackend.login(body.email, body.password);
        return of(new HttpResponse({ status: 200, body: result }));
      } catch (error: any) {
        return of(new HttpResponse({ 
          status: 401, 
          body: { message: error.message } 
        }));
      }
    }

    // Allow other requests to go through
    return next.handle(request);
  }
}
