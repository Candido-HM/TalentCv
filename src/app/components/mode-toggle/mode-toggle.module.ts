import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModeStorageService, MODE_STORAGE_SERVICE } from "./services/mode-storage.service";
import { ModeToggleService } from "./services/mode-toggle.service"; 
import { ModeToggleComponent } from "./mode-toggle.component";

@NgModule({
    declarations: [ModeToggleComponent],
    providers: [
        ModeToggleService,
        {
            provide: MODE_STORAGE_SERVICE,
            useClass: ModeStorageService
        }
    ],
    imports: [
        CommonModule
    ],
    exports: [ModeToggleComponent]
})

export class ModeToggleModule { }