import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        ToastrModule.forRoot(),
    ],
    entryComponents: [
    ],
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ToastrModule,
    ],
    providers: [
    ]
})
export class SharedModule { }
