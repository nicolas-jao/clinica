import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import httpClient from '../config/axios';

const baseURL = '/api/v1/veterinarios';

function ListagemVeterinarios() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-veterinarios`);
  };

  const editar = (id) => {
    navigate(`/cadastro-veterinarios/${id}`);
  };

  const info = (id) => {
    navigate(`/info-veterinarios/${id}`);
  };

  const [dados, setDados] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    
    await httpClient
      .delete(url, {
        headers: { 'Content-Type': 'application/json' },
        data: data
      })
      .then(function (response) {
        mensagemSucesso(`Veterinário excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o veterinário`);
      });
  }

  React.useEffect(() => {
  
    httpClient.get(baseURL).then((response) => {
      setDados(response.data);
    }).catch(error => {
      mensagemErro("Erro ao carregar a lista de veterinários.");
    });
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Veterinários'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo Veterinário
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome</th>
                    <th scope='col'>CPF</th>
                    <th scope='col'>CRMV</th>
                    <th scope='col'>Telefone</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>CEP</th>
                    <th scope='col'>Número</th>
                    <th scope='col'>Complemento</th>
                    <th scope='col'>Ações</th> {/*  */}
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{dado.cpf}</td>
                      <td>{dado.crmv}</td>
                      <td>{dado.telefone}</td>
                      <td>{dado.email}</td>
                      <td>{dado.cep}</td>
                      <td>{dado.numero}</td>
                      <td>{dado.complemento}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                          {/* <IconButton
                            aria-label='info'
                            onClick={() => info(dado.id)}
                          >
                            <ArrowForwardIcon />
                          </IconButton> */}
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{' '}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemVeterinarios;