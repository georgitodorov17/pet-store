import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Pet } from '../../models/pet.model';

@Component({
  selector: 'app-edit-pet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {

  form = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    age: [0, Validators.required],
    imageUrl: ['', Validators.required],
    description: ['', Validators.required]
  });

  petId: string = '';
  errorMessage: string = '';
  isOwner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private petService: PetService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.petId = this.route.snapshot.paramMap.get('id')!;

    const pet = await this.petService.getPetById(this.petId);

    if (!pet) {
      this.router.navigate(['/catalog']);
      return;
    }

    // Check ownership
    this.authService.user$.subscribe(user => {
      if (!user || user.uid !== pet.ownerId) {
        this.router.navigate(['/catalog']);
      } else {
        this.isOwner = true;
      }
    });

    // Fill form
    this.form.patchValue({
      name: pet.name,
      type: pet.type,
      age: pet.age,
      imageUrl: pet.imageUrl,
      description: pet.description
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

   const formValue = this.form.value;

const updatedPet = {
  name: formValue.name || '',
  type: formValue.type || '',
  age: formValue.age || 0,
  imageUrl: formValue.imageUrl || '',
  description: formValue.description || ''
};

this.petService.updatePet(this.petId, updatedPet)
  .then(() => this.router.navigate(['/pets', this.petId]))
  .catch(err => this.errorMessage = err.message);
     
  }
}