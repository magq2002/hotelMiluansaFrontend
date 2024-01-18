import { Component, inject } from '@angular/core';
import { CheckIn } from './interfaces/checkIn.interfaces';
import { CheckInService } from './services/checkIn.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, filter, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../reservations/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditCheckInComponent } from './components/create-edit-check-in/create-edit-check-in.component';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrl: './check-in.component.css'
})
export class CheckInComponent {

  private dialog = inject(MatDialog);


  items!: CheckIn[];
  // items$!: Observable<CheckIn[]>;
  // searcher = new FormControl('');
  filterItem ="";

  private checkInService = inject(CheckInService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  constructor(){

    this.checkInService.getcheckIn().subscribe(item=>{
      this.items = item;
    })
  }

  // ngOnInit(): void {
  //   this.items$ = this.conexion.getBusqueda();
  //   this.searcher.valueChanges.subscribe((search) =>{
  //     if(search){
  //       this.items$ = this.conexion.getBusqueda(search);
  //     } else {
  //       this.items$ = this.conexion.getBusqueda();
  //     }
  //   });
  // }
  // eliminarCheckIn(id: string){
  //   this.checkInService.deleteCheckInById(id).subscribe( checkIn => {
  //     // this.toastr.error('Check-in fue eliminado con éxito!', 'Check-in Eliminado!');
  //   })
  // }

  onEditCheckIn(id: string){
    const dialogEdit = this.dialog.open( CreateEditCheckInComponent, {
      data: {
        id: id,
        type: 1
      }
    });

    dialogEdit.afterClosed().subscribe(item => {
      // this.dialogRef.close();
      this.checkInService.getcheckIn().subscribe(item=>{
        this.items = item;
      })
    })
  }

  onDeleteReservation( id: string){
    this.checkInService.deleteCheckInById(id).subscribe( checkIn => {
    })

    const dialogDelete = this.dialog.open( ConfirmDialogComponent);

    dialogDelete.afterClosed()
      .pipe(
        filter( (result:boolean) => result ),
        switchMap( () => this.checkInService.deleteCheckInById( id )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(result => {

      this.toastr.error('Check-in fue eliminado con éxito!', 'Check-in Eliminado!');
      this.checkInService.getcheckIn().subscribe(item=>{
        this.items = item;
      })

      });
  }

  onSubmit():void {

    const dialogAdd = this.dialog.open( CreateEditCheckInComponent, {
      data: {
        type: 2
      }
    });

    dialogAdd.afterClosed().subscribe(item => {
      this.checkInService.getcheckIn().subscribe(item=>{
        this.items = item;
      })
    });
  }

}
