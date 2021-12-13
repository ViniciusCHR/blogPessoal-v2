import { AuthService } from './../service/auth.service';
import { UserLogin } from './../model/UserLogin';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UserLogin = new UserLogin()

  foto: string = environment.foto
  nome: string = environment.nome

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  logar(){
    this.auth.login(this.userLogin).subscribe((resp: UserLogin) => {
      this.usuarioLogin = resp
      
      environment.foto = this.userLogin.foto
      environment.tipo = this.userLogin.tipo
      environment.nome = this.userLogin.nome
      environment.usuario = this.userLogin.usuario
      environment.token = this.userLogin.token
      environment.id = this.userLogin.id

      console.log(environment)

      this.router.navigate(['/inicio'])
    }, erro => {
      if (erro.status == 401) {
        alert("Usuário e/ou senha inválidos!")
      }
    }
    )
  }

}