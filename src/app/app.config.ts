import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideAnimationsAsync(),
     provideHttpClient(withInterceptors([loadingInterceptor])),
    provideAnimationsAsync(),
    provideToastr({
      timeOut: 900,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    importProvidersFrom([BrowserAnimationsModule])
    ]
};
