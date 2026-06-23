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

const baseURL = '/api/v1/especies';

function ListagemEspecies() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-especies`);
  };

  const editar = (id) => {
    navigate(`/cadastro-especies/${id}`);
  };

  const busca = (id) => {
    navigate(`/busca-raça/${id}`);
  };

  const listagem = () => {
    navigate(`/listagem-raças/`);
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
        mensagemSucesso(`Espécie excluída com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir a espécie`);
      });
  }

  React.useEffect(() => {
   
    httpClient.get(baseURL).then((response) => {
      setDados(response.data);
    }).catch(error => {
      mensagemErro("Erro ao carregar a lista de espécies.");
    });
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Espécies'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Nova Espécie
              </button>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={() => listagem()}
              >
                Listagem de Raças
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome</th>
                    <th scope='col'>Ações</th> {/*  */}
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
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
                          <IconButton
                            aria-label='buscar'
                            onClick={() => busca(dado.id)}
                          >
                            <ArrowForwardIcon />
                          </IconButton>
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

export default ListagemEspecies;