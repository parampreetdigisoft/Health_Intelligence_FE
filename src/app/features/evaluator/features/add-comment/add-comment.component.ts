import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
<<<<<<< HEAD
import { AiCountrySummeryDto } from 'src/app/core/models/aiVm/AiCountrySummeryDto';
=======
import { AiCitySummeryDto } from 'src/app/core/models/aiVm/AiCitySummeryDto';
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit, OnChanges {

<<<<<<< HEAD
  @Input() country?: AiCountrySummeryDto | null = null;
=======
  @Input() city?: AiCitySummeryDto | null = null;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  @Input() loading = false;

  @Output() onSubmit = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<boolean>();

  commentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
<<<<<<< HEAD
    if (changes['country'] && this.commentForm) {
      this.commentForm.patchValue({
        countryID: this.country?.countryID,
        comment:[this.country?.comment]
=======
    if (changes['city'] && this.commentForm) {
      this.commentForm.patchValue({
        cityID: this.city?.cityID,
        comment:[this.city?.comment]
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      });
    }
  }

  private buildForm(): void {
    this.commentForm = this.fb.group({
<<<<<<< HEAD
      countryID: [this.country?.countryID],
=======
      cityID: [this.city?.cityID],
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submit(): void {
<<<<<<< HEAD
    if (this.commentForm.invalid || !this.country) return;
=======
    if (this.commentForm.invalid || !this.city) return;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1

    this.onSubmit.emit(this.commentForm.value);
  }

  closeModel(): void {
    this.closeModal.emit(true);
  }
}
