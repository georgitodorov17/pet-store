import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { AuthService } from '../../services/auth.service';
import { Observable, map , switchMap} from 'rxjs';
import { Pet } from '../../models/pet.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  pets$!: Observable<Pet[]>;

  constructor(
    private petService: PetService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  this.pets$ = this.authService.user$.pipe(
    switchMap(user => {
      if (!user) return [];

      return this.petService.getPets().pipe(
        map(pets => pets.filter(p => p.ownerId === user.uid))
      );
    })
  );
}
}