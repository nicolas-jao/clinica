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

function InfoConsultas() {

  let custoTotal = 0;
  const navigate = useNavigate();
  const { idParam } = useParams();
  const baseURL = `${BASE_URL2}/info-consultas/${idParam}`;


  const editar = (id) => {
    navigate(`/cadastro-consultas/${id}`);
  };

  const voltar = () => {
    navigate(-1);
  };

  const [dados, setDados] = React.useState(null);
  const [lista, setLista] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${BASE_URL}/consultas/${id}`;
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json'},
      })
      .then(function (response) {
        mensagemSucesso(`Consulta excluída com sucesso!`);
        setLista(
          lista.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir consulta`);
      });
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
      setLista(response.data.lista);
    });
  }, []);

  if (!dados) return null;
  if (!lista) return null;

  return (
    <>
    <div className='container'>
      <button
        type='button'
        className='btn btn-secondary'
        onClick={() => voltar()}
      >
        Voltar
        <ArrowBackIcon/>
      </button>
      <br></br>
      <br></br>
      <Card title={`Detalhes de consulta`}>
        <div className='row'>
          <div className='col-lg-12'>
          <tbody>
                  <b>Animal: </b> {dados.nomeAnimal} <br/>
                  <b>Veterinário: </b> {dados.nomeVet} <br/>
                  <b>Data da Consulta: </b> {dados.data} <br/>
                  <b>Orientações: </b> {dados.orientacoes} <br/>
                  <b>Status: </b> {dados.status} <br/>
          </tbody>
          </div>
        </div>
      </Card>
    </div>
    <br></br>
    <div className='container'>
      <Card title={`Procedimentos`}>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>   
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Procedimento</th>
                    <th scope='col'>Custo</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((dado) => {
                    custoTotal = custoTotal + dado.custo;
                    return (
                      <tr key={dado.id}>
                        <td>{dado.nome}</td>
                        <td>{dado.custo}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td><b>Total: </b></td> <td>{custoTotal}</td>
                  </tr>
                </tbody>
              </table>{' '}
            </div>
          </div>
        </div>
      </Card>
    </div>
    </>
  );
}

export default InfoConsultas;