import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatIconModule
} from "@angular/material";

const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatIconModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class MaterialModule {}
