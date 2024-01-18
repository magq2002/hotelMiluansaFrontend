import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckInService } from '../../services/checkIn.service';
import { CheckIn } from '../../interfaces/checkIn.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-edit-check-in',
  templateUrl: './create-edit-check-in.component.html',
  styleUrl: './create-edit-check-in.component.css'
})
export class CreateEditCheckInComponent implements OnInit{

  private checkInService = inject(CheckInService);
  private snackbar = inject(MatSnackBar);

  public checkIn: CheckIn = {
    _id:         '',
    name:        '',
    nuip_type:   '',
    nuip:         0,
    dateBirth:   '',
    city:        '',
    address:     '',
    phone:       '',
    email:       '',
    health:      '',
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CreateEditCheckInComponent>) {}

  private toastr = inject(ToastrService);

  ngOnInit(): void {
    const { id: id_data, type: type_data } = this.data;
    this.type = type_data;
    this.id = id_data;
    if ( this.type !== 1 ) return;
    this.checkInService.getcheckInById(this.id).subscribe( checkIn => {
      this.checkIn = checkIn;
      this.checkInForm.reset( checkIn );
    });
    // throw new Error('Method not implemented.');
  }

  private id: string = '';
  private type: number = 0;

  get currentType() {
    return this.type;
  }

  public checkInForm = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', { nonNullable: true }),
    nuip_type: new FormControl(''),
    nuip: new FormControl,
    dateBirth: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    health: new FormControl(''),
  });

  // public publishers = [
  //   { id: 'DC Comics', desc: 'DC - Comics' },
  //   { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  // ];

  get currentCheckIn(): CheckIn {
    const checkIn = this.checkInForm.value;

    // Formatea la fecha de checkIn como string YYYY-MM-DD
    // const checkInString = this.datePipe.transform(reservation.checkIn, 'yyyy-MM-dd');
    // const checkOutString = this.datePipe.transform(reservation.checkOut, 'yyyy-MM-dd');

    const { id, ...data } = checkIn;
    // // Crea un nuevo objeto con la fecha formateada
    // const currentReservation = {
    //   ...data,
    //   checkIn: checkInString!,
    //   checkOut: checkOutString!
    // };

    return data as CheckIn;
  }

  onSubmit(){
    this.checkInService.addCheckIn ( this.currentCheckIn )
      .subscribe( reservation => {
        this.toastr.success('Check-in fue registrado con éxito!', 'Check-in Registrado!');
        this.dialogRef.close();
      });
      return;
  }

  onEditCheckIn(){
    if ( this.checkInForm.invalid ) return;
      this.checkInService.updateReservation( this.id, this.currentCheckIn )
      .subscribe( reservation => {
        this.toastr.info('Check-in fue actualizado con éxito!', 'Check-in Actualizado!');
        this.dialogRef.close();
      });

      return;


  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', { duration: 2500})
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
