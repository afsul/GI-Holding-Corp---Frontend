import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProviderService } from '../service/http-provider.service';
import { WebApiService } from '../service/web-api.service';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.scss']
})
export class ViewNoteComponent implements OnInit {

  noteId: any;
  noteDetail : any= [];
   
  constructor(public webApiService: WebApiService, private route: ActivatedRoute, private httpProvider : HttpProviderService) { }
  
  ngOnInit(): void {
    this.noteId = this.route.snapshot.params['noteId'];      
    this.getNoteDetailById();
  }

  getNoteDetailById() {       
    this.httpProvider.getNoteDetailById(this.noteId).subscribe((data : any) => {      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.noteDetail = resultData;
        }
      }
    },
    (error :any)=> { }); 
  }

}
