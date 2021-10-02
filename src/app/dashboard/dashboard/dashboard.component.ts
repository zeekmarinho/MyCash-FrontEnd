import { Component, OnInit } from '@angular/core';
import { Despesa } from 'src/app/models/despesa';
import { Receita } from 'src/app/models/receita';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  auxObject = {count: 100, data: []};
  listDespesas: Despesa[];
  listReceitas: Receita[];

  constructor() { }

  ngOnInit(): void {
    this.populateDespesas();
    this.populateReceitas();
  }
    
  populateDespesas(){
    for (let i = 0; i < this.auxObject.count ; i++) {
      this.auxObject.data.push({
        data: '2' + '1' + '/' + '12' + '/' + '20' + i,
        valor: 'R$' + i + i + i + i,
        tipo: 'ALUGUEL',
        descricao: 'caro, podendo ser até maior que' + i,
        fixo: true
      });
      this.listDespesas = this.auxObject.data; 
    }
    this.auxObject.data = [];   
  }

  populateReceitas(){
    for (let i = 0; i < this.auxObject.count ; i++) {
      this.auxObject.data.push({
        data: '2' + '1' + '/' + '12' + '/' + '20' + i,
        valor: 'R$' + i + i + i + i,
        tipo: 'SALÁRIO',
        descricao: 'COM ADICIONAL DE R$: ' + i,
        fixo: true
      });
      this.listReceitas = this.auxObject.data; 
    }
    this.auxObject.data = [];   
  }

  edit(receita:Receita){

  }

  delete(){
    Swal.fire({
      title: 'Você tem mesmo certeza?',
      text: 'Deseja mesmo deletar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Não'
    }).then((result) =>{
      if(result.isConfirmed){
        Swal.fire(
          'Deletando!',
          'Deletando com Sucesso.',
          'success'
        );
      }
    });
  }

}
