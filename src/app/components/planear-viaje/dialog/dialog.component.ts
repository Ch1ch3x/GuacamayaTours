import { Component, OnInit, Inject } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"]
})
export class DialogComponent {
  public salida: Date;
  public llegada: Date;
  public personas: number;
  public tipoH: any;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public tipoHabitaciones: any
  ) {}

  closeDialog() {
    this.dialogRef.close({
      fechaLlegada: this.llegada,
      fechaSalida: this.salida,
      tipoHabitacion: this.tipoH,
      integrantes: this.personas
    });
  }
}
