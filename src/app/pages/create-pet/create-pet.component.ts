import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { PetService } from '../../services/pet.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-pet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-pet.component.html'
})
export class CreatePetComponent {

  errorMessage = '';

  form = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    age: [0, Validators.required],
    imageUrl: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.form.invalid) return;

    this.authService.user$.subscribe(user => {
      if (!user) return;

      const pet = {
        ...this.form.value,
        ownerId: user.uid
      };

      const formValue = this.form.value;

const newPet = {
  name: formValue.name ?? '',
  type: formValue.type ?? '',
  age: formValue.age ?? 0,
  imageUrl: formValue.imageUrl ?? '',
  description: formValue.description ?? '',
  ownerId: user.uid
};

this.petService.addPet(newPet)
  .then(() => this.router.navigate(['/catalog']))
  .catch(err => this.errorMessage = err.message);
    });
  }
}