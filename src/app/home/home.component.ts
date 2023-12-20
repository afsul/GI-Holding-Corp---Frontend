import { Component, Input, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  token: any;
  closeResult = '';
  noteList: any = [];
  constructor(private router: Router, private modalService: NgbModal,
    private toastr: ToastrService, private httpProvider : HttpProviderService) { }

  ngOnInit(): void {
    this.getAllNote();
    this.token = localStorage.getItem('token');
    console.log(this.token,"[p[p[p[p[p[p[p[p[p[p[")
    if (this.token) {
      this.router.navigateByUrl('/Home'); // Redirect to home if token exists
    } else {
      this.router.navigateByUrl('/SignIn'); // Redirect to sign-in if no token
    }
    
  }

  

  logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Redirect to sign-in page
    this.router.navigate(['SignIn']);
    this.ngOnInit()
  }

  async getAllNote() {
    this.httpProvider.getallNote().subscribe((data: any) => {
  
      if (data != null && data.body != null) {

        var resultData = data.body;
        if (resultData) {
          this.noteList = resultData;
          console.log(this.noteList)
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.noteList = [];
          console.log(this.noteList)

            }
          }
        }
      });
      
  }

  AddNote() {
    this.router.navigate(['AddNote']);
  }

  deleteNoteConfirmation(note: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteNote(note);
      },
        (reason) => {});
  }

  deleteNote(note: any) {
    this.httpProvider.deleteNoteById(note.id).subscribe((data : any) => {
          this.toastr.success("Note Deleted Succesfully");
          this.getAllNote();
        
    },
    (error : any) => {});
  }
}