import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }  from './app.component';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ProductsComponent } from './products/products.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        NgbModule.forRoot()
    ],
    declarations: [
        AppComponent,
        ProductsComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }