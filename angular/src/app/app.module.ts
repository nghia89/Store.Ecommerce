import { AccountConfigModule } from '@abp/ng.account/config';
import { CoreModule } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { IdentityConfigModule } from '@abp/ng.identity/config';
import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
import { TenantManagementConfigModule } from '@abp/ng.tenant-management/config';
import { ThemeBasicModule } from '@abp/ng.theme.basic';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTE_PROVIDER } from './route.provider';
import { FeatureManagementModule } from '@abp/ng.feature-management';
import { AbpOAuthModule } from '@abp/ng.oauth';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotificationService } from '@share/services/notification.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogService } from 'primeng/dynamicdialog';
import { UtilityService } from '@share/services/utility.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ImagekitioAngularModule } from 'imagekitio-angular';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
    }),
    ImagekitioAngularModule.forRoot({
      publicKey: "public_OynjbKQaLjIk1GdtAZ5kAacjHGE=",
      urlEndpoint: "https://ik.imagekit.io/estore",
      authenticationEndpoint: "private_5nuYxzoES0+WUfEZM+f6Bmb4oGM="
    }),
    AppLayoutModule,

    AbpOAuthModule.forRoot(),
    ThemeSharedModule.forRoot(),
    AccountConfigModule.forRoot(),
    IdentityConfigModule.forRoot(),
    TenantManagementConfigModule.forRoot(),
    SettingManagementConfigModule.forRoot(),
    ThemeBasicModule.forRoot(),
    FeatureManagementModule.forRoot(),
    ToastModule,
    ConfirmDialogModule
  ],
  declarations: [AppComponent],
  providers: [APP_ROUTE_PROVIDER, MessageService, NotificationService, DialogService, UtilityService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
