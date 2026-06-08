import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { BASE_URL } from '../config/axios';
import { BASE_URL2 } from '../config/axios';

function BuscaRacas() {
  const navigate = useNavigate();
  const { idParam } = useParams();
  const baseURL = `${BASE_URL2}/especies/${idParam}/racas`;

  const cadastrar = () => {
    navigate(`/cadastro-raças`);
  };

  const editar = (id) => {
    navigate(`/cadastro-raças/${id}`);
  };

  const voltar = () => {
    navigate(-1);
  };

  const [dados, setDados] = React.useState(null);
  const [lista, setLista] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${BASE_URL}/racas/${id}`;
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Espécie excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o espécie`);
      });
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      console.log(response.data);
      setDados(response.data);
      setLista(response.data);
    });
  }, []);

  if (!dados) return null;
  if (!lista) return null;

  return (
    <div className='container'>
      <Card title={`Raças de ${dados.nome}`}>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Nova Raça
              </button>
              <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => voltar()}
                >
                  Voltar
                  <ArrowBackIcon/>
                </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((dado) => (
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

export default BuscaRacas;