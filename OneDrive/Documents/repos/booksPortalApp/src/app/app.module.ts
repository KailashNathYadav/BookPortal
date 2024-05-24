import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import {routes} from './app-routing.module';
import { AppRoutingModule } from "./app-routing.module";
import { ErrorComponent } from './error/error.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        BookListComponent,
        ErrorComponent
    ],
    providers: [
        provideHttpClient(),
        provideRouter(routes),
        provideClientHydration(),
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ]
})
export class AppModule { }
