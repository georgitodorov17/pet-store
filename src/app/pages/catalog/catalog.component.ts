import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  pets$!: Observable<Pet[]>;

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.pets$ = this.petService.getPets();
  }
}