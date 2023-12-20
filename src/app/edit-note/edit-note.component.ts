import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  editNoteForm: noteForm = new noteForm();

  @ViewChild("noteForm")
  noteForm!: NgForm;

  isSubmitted: boolean = false;
  noteId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.noteId = this.route.snapshot.params['noteId'];
    this.getNoteDetailById();
  }

  getNoteDetailById() {
    this.httpProvider.getNoteDetailById(this.noteId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editNoteForm.Id = resultData.id;
          this.editNoteForm.title = resultData.title;
          this.editNoteForm.body = resultData.body;
        }
      }
    },
      (error: any) => { });
  }

  EditNote(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.editNoteDetailById(this.editNoteForm,this.noteId).subscribe(async data => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null) {
            if (resultData != null) {
              this.toastr.success("Note Updated Succesfully");
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
}

export class noteForm {
  Id: number = 0;
  title: string = "";
  body: string = "";
}
