import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...');

        const bodyValue = context.switchToHttp().getRequest().body
        const fileName = context.switchToHttp().getRequest().file.filename
    
        const body = {
            ...bodyValue,
            fileName
        }

        console.log('body', body);


        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => console.log(`After... ${Date.now() - now}ms`)),
            );
    }


}