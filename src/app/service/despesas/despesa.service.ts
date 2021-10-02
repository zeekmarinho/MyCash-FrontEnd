import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Despesa } from 'src/app/models/despesa';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  private edit = new BehaviorSubject<Despesa>(null);
  botaoEdit = this.edit.asObservable();
  username = localStorage.getItem('username');
  password = localStorage.getItem('password');

  constructor(private http: HttpClient, private router: Router) { }

  getDespesaFromScreen(despesa: Despesa){
    this.edit.next(despesa);
    this.router.navigate(['/despesas-form']);
  }

  getAllDespesas(){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});

    return this.http.get<Despesa[]>('http://localhost:8095/despesa', {headers}).pipe(
      map(
        despesaLista => {
          if (despesaLista){
            return despesaLista;
          }else{
            return [];
          }
        }
      )
    );
  }

  createDespesas(body: Despesa){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});

    return this.http.post<Despesa>('http://localhost:8095/despesa', body , {headers}).pipe(
      map(
        despesaData => {
            return despesaData;
        }
      )
    );
  }

  deleteRDespesas(id: number){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});

    return this.http.delete('http://localhost:8095/despesa/' + id, {headers, responseType: 'text' as 'text'}).pipe(
      map(
        despesaData => {
            return despesaData;
        }
      )
    );
  }

  updateDespesas(body: Despesa){
    const id = body.id;
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});

    return this.http.put<Despesa>('http://localhost:8095/despesa/' + id, body , {headers}).pipe(
      map(
        despesaData => {
            return despesaData;
        }
      )
    );
  }

  findByDate(){
    // fica com vocês
  }

}
