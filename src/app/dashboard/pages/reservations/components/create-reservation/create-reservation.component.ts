import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reservation } from '../../interfaces/reservation.interface';
import { ReservationsService } from '../../services/reservations.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.css'
})
export class CreateReservationComponent {

  private reservationsService = inject(ReservationsService);
  private snackbar = inject(MatSnackBar);
  private dialog = inject(MatDialog);


  public reservationForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true }),
    adults: new FormControl(''),
    children: new FormControl(''),
    room: new FormControl(0),
    // publisher: new FormControl<Publisher>( Publisher.DCComics ),

  });

  public rooms = [
    { id: 201, desc: 'Doble', color: '#FFC7E8'},
    { id: 202, desc: 'Familiar', color: '#FFB6B6' },
    { id: 203, desc: 'Cuadruple', color: '#D2D6FF' },
    { id: 204, desc: 'Triple', color: '#b0fcb0' },

  ];

  constructor(
    // private heroesService: HeroesService,
    // private activedRoute: ActivatedRoute,
    // private router: Router,
     ){}

  // ngOnInit(): void {

  //   if(!this.router.url.includes('edit')) return;

  //   this.activedRoute.params.pipe(switchMap( ({ id }) => this.heroesService.getHeroesById( id ))
  //   ).subscribe( hero => {
  //       if( !hero ) return this.router.navigateByUrl('/')

  //       this.heroForm.reset( hero );
  //       return;
  //   })
  // }

  get currentReservation(): Reservation {
    const reservation = this.reservationForm.value as Reservation;
    return reservation;
  }

  // onSubmit():void {

  //   if ( this.heroForm.invalid ) return;

  //   if ( this.currentHero.id ){
  //     this.heroesService.updateHero( this.currentHero )
  //     .subscribe( hero => {
  //       this.showSnackbar(`${ hero.superhero } updated!`);
  //     });

  //     return;
  //   }

  //   this.heroesService.addHero( this.currentHero )
  //     .subscribe( hero => {
  //       this.router.navigate(['/heroes/edit', hero.id]);
  //       this.showSnackbar(`${ hero.superhero } created!`);

  //     });

  //     return;

  // }

  // onDeleteHero(){
  //   if( !this.currentHero.id ) throw Error('Hero id is required');

  //   const dialogRef = this.dialog.open( ConfirmDialogComponent, {
  //     data: this.heroForm.value
  //   });

  //   dialogRef.afterClosed()
  //     .pipe(
  //       filter( (result:boolean) => result ),
  //       switchMap( () => this.heroesService.deleteHeroById( this.currentHero.id )),
  //       filter( (wasDeleted: boolean) => wasDeleted ),
  //     )
  //     .subscribe(result => {
  //       this.router.navigate(['/heroes']);
  //     });

    // dialogRef.afterClosed().subscribe( result => {
    //   if ( !result ) return;

    //   this.heroesService.deleteHeroById( this.currentHero.id ).subscribe( wasDeleted => {
    //     if( wasDeleted )
    //       this.router.navigate(['/heroes']);
    //   } );
    // })
  // }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', { duration: 2500})
  }

  onSubmit(){
    this.reservationsService.addReservation ( this.currentReservation )
      .subscribe( reservation => {

        this.showSnackbar(`${ reservation.name } created!`);

      });

      return;
  }
}
