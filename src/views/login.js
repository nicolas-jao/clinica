import React from 'react';
import axios from 'axios'; 

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

class Login extends React.Component {
  state = {
    login: '',
    senha: '',
  };

  logar = () => {
    const credenciais = {
      login: this.state.login,
      senha: this.state.senha
    };

    axios.post('http://localhost:8080/api/v1/usuarios/auth', credenciais)
      .then(response => {
        const token = response.data.token;
        const isAdmin = response.data.admin; 

        localStorage.setItem('token_usuario', token);
        localStorage.setItem('is_admin', isAdmin);

        mensagemSucesso(`Usuário ${this.state.login} logado com sucesso!`);
        
      })
      .catch(erro => {
        mensagemErro('Erro: Usuário não encontrado ou senha incorreta!');
      });
  };

  cancelar = () => {
    this.setState({
      login: '',
      senha: '',
    });
  };

  render() {
    return (
      <div className='container'>
        <div className='col-lg-4'>
          <Card title='Acesso'>
            <div className='row'>
              <div className='bs-component'>
                <FormGroup label='Login: *' htmlFor='inputLogin'>
                  <input
                    type='text'
                    id='inputLogin'
                    value={this.state.login}
                    className='form-control'
                    name='login'
                    onChange={(e) => this.setState({ login: e.target.value })}
                  />
                </FormGroup>
                <FormGroup label='Senha: *' htmlFor='inputSenha'>
                  <input
                    type='password'
                    id='inputSenha'
                    value={this.state.senha}
                    className='form-control'
                    name='senha'
                    onChange={(e) => this.setState({ senha: e.target.value })}
                  />
                </FormGroup>
                <Stack spacing={1} padding={1} direction='row'>
                  <button
                    onClick={this.logar}
                    type='button'
                    className='btn btn-success'
                  >
                    Entrar
                  </button>
                  <button
                    onClick={this.cancelar}
                    type='button'
                    className='btn btn-danger'
                  >
                    Cancelar
                  </button>
                </Stack>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;