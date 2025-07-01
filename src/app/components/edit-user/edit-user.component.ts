import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
  standalone: false
})
export class EditUserComponent implements OnInit {
  id!: number;
  formGroup: FormGroup
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router
  ) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email : ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.loadUser(this.id).subscribe(user => {
      this.formGroup.patchValue({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      })
    })
  }

  onSave(){
    if(this.formGroup.valid) {
      const updateUser: User = {
        id: this.id,
        ...this.formGroup.value
      };
      this.userService.updateUser(updateUser).subscribe(()=> {
        this.router.navigate(['/users']);
      })
    }
  }

}
