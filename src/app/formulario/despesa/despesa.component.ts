import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tipo } from 'src/app/models/util';
import Swal from 'sweetalert2';
import { Despesa } from 'src/app/models/despesa';
import { DespesaService } from 'src/app/service/despesas/despesa.service';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.scss']
})
export class DespesaComponent implements OnInit {

  listTiposDespesa: Tipo[] = [
    {value: '0', viewValue: 'Saúde'},
    {value: 'salario', viewValue: 'salario'},
    {value: '1', viewValue: 'Transporte'},
    {value: '2', viewValue: 'Educação'},
    {value: '3', viewValue: 'Lazer'},
    {value: '4', viewValue: 'Trabalho'},
    {value: '5', viewValue: 'Alimento'},
    {value: '6', viewValue: 'Domicilio'},
    {value: '7', viewValue: 'Emprestimo'},
    {value: '8', viewValue: 'Outro'},
  ];
  startDate = new Date(1990, 0, 1);
  formDespesa = new FormGroup ({
    data: new FormControl('', [Validators.required]),
    valor: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    fixo: new FormControl('', [Validators.required]),
  });

  despesasObject: Despesa;

  constructor(private router: Router, public despesaService: DespesaService) { }

  ngOnInit(): void {

    this.despesaService.botaoEdit.subscribe( edit => {
      console.log(edit);
      this.despesasObject = edit;
      if (edit){
        this.formDespesa.get('data').setValue(edit.data);
        this.formDespesa.get('valor').setValue(edit.valor);
        this.formDespesa.get('tipo').setValue(edit.tipo);
        this.formDespesa.get('descricao').setValue(edit.descricao);
        this.formDespesa.get('fixo').setValue(edit.fixo);
      }
    });
  }

  salvar(){

    if (this.formDespesa.valid && this.despesasObject === null){
      this.despesaService.createDespesas(this.formDespesa.value).subscribe(
        data => {
          console.log(data);
        }
      );
    } else if (this.formDespesa.valid){
      const id = this.despesasObject.id;
      this.despesasObject = this.formDespesa.value;
      this.despesasObject.id = id;
      this.despesaService.updateDespesas(this.despesasObject).subscribe(
        data => {
          console.log(data);
        }
      );
    }
  }

  update(){
    this.despesaService.updateDespesas(this.formDespesa.value).subscribe(
      data => {
        console.log(data);
      }
    );
  }

}
