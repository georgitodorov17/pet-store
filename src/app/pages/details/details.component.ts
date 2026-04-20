import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  pet: Pet | null = null;
  isOwner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.pet = await this.petService.getPetById(id);

    this.authService.user$.subscribe(user => {
      if (user && this.pet) {
        this.isOwner = user.uid === this.pet.ownerId;
      }
    });
  }

  async deletePet() {
    if (!this.pet?.id) return;

    await this.petService.deletePet(this.pet.id);
    this.router.navigate(['/catalog']);
  }
}