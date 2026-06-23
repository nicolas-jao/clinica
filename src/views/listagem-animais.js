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

const urlBaseAnimais = '/api/v1/animais';

function ListagemAnimais() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-animais`);
  };

  const editar = (id) => {
    navigate(`/cadastro-animais/${id}`);
  };

  const info = (id) => {
    navigate(`/info-animais/${id}`);
  };

  const [dados, setDados] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${urlBaseAnimais}/${id}`;
    
    
    await httpClient
      .delete(url, {
        headers: { 'Content-Type': 'application/json' },
        data: data 
      })
      .then(function (response) {
        mensagemSucesso(`Animal excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o animal`);
      });
  }

  React.useEffect(() => {
  
    httpClient.get(urlBaseAnimais).then((response) => {
      setDados(response.data);
    }).catch(error => {
      mensagemErro("Erro ao carregar a lista. Você está logado?");
    });
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Animais'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo Animal
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome</th>
                    <th scope='col'>Data de Nascimento</th>
                    <th scope='col'>Sexo</th>
                    <th scope='col'>Castrado</th>
                    <th scope='col'>Observações</th>
                    <th scope='col'>Foto</th>
                    <th scope='col'>Tutor</th>
                    <th scope='col'>Raça</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{dado.dataNascimento}</td>
                      <td>{dado.sexo}</td>
                      <td>{dado.castrado}</td>
                      <td>{dado.observações}</td>
                      <td>{dado.foto}</td>
                      <td>{dado.nomeTutor}</td>
                      <td>{dado.nomeRaça}</td>
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

export default ListagemAnimais;