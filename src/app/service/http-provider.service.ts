import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

//var apiUrl = "https://localhost:44370/";

var apiUrl = "http://localhost:8000/";

var httpLink = {
  getAllNote: apiUrl + "api/v1/notes/",
  deleteNoteById: apiUrl + "api/v1/notes/",
  getNoteDetailById: apiUrl + "api/v1/notes/",
  saveNote: apiUrl + "api/v1/notes/",
  signUp: apiUrl + "api/signup/",
  signIn: apiUrl + "api/signin/"
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }
  public getallNote(): Observable<any> {
    return this.webApiService.get(httpLink.getAllNote);
  }

  public deleteNoteById(model: any): Observable<any> {
    return this.webApiService.delete(httpLink.deleteNoteById + model);
  }

  public getNoteDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getNoteDetailById + model);
  }

  public editNoteDetailById(model: any,id:any): Observable<any> {
    return this.webApiService.put(httpLink.getNoteDetailById + id+'/',model);
  }

  public saveNote(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveNote, model);
  }
  public signUp(model: any): Observable<any> {
    return this.webApiService.post(httpLink.signUp, model);
  }
  public signIn(model: any): Observable<any> {
    return this.webApiService.post(httpLink.signIn, model);
  }
  
}
