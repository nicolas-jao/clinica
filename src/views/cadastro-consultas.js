import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';
import { BASE_URL2 } from '../config/axios';

function CadastroConsultas() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL2}/consultas`;

  const [id, setId] = useState('');
  const [dia, setDia] = useState('');
  const [orientacoes, setOrientacoes] = useState('');
  const [status, setStatus] = useState('');
  const [idVet, setIdVet] = useState('');
  const [nomeVet, setNomeVet] = useState('');
  const [idAnimal, setIdAnimal] = useState('');
  const [nomeAnimal, setNomeAnimal] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setDia('');
      setOrientacoes('');
      setStatus('');
      setIdVet('');
      setNomeVet('');
      setIdAnimal('');
      setNomeAnimal('');

    } else {
      setId(dados.id);
      setDia(dados.data);
      setOrientacoes(dados.orientacoes);
      setStatus(dados.status);
      setIdVet(dados.idVet);
      setNomeVet(dados.nomeVet);
      setIdAnimal(dados.idAnimal);
      setNomeAnimal(dados.nomeAnimal);
    }
  }

  async function salvar() {
    let data = { id, dia, orientacoes, status, idVet, nomeVet, idAnimal, nomeAnimal};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Consulta cadastrada com sucesso!`);
          navigate(`/listagem-consultas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Consulta alterada com sucesso!`);
          navigate(`/listagem-consultas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if(idParam != null){
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setDia(dados.dia);
      setOrientacoes(dados.orientacoes);
      setStatus(dados.status);
      setIdVet(dados.idVet);
      setNomeVet(dados.nomeVet);
      setIdAnimal(dados.idAnimal);
      setNomeAnimal(dados.nomeAnimal);
    }
  }

  const [dadosVet, setDadosVet] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/veterinarios`).then((response) => {
      setDadosVet(response.data);
    });
  }, []);


    const [dadosAnimais, setDadosAnimais] = React.useState(null);

    useEffect(() => {
    axios.get(`${BASE_URL}/animais`).then((response) => {
      setDadosAnimais(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosVet) return null;
  if (!dadosAnimais) return null;

return (
    <div className='container'>
      <Card title='Agendamento de Consulta'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Data: *' htmlFor='inputDia'>
                <input
                  type='date'
                  id='inputDia'
                  value={dia}
                  className='form-control'
                  name='dia'
                  onChange={(e) => setDia(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Orientacoes: *' htmlFor=''>
                <input
                  type='text'
                  maxLength='50'
                  id=''
                  value={orientacoes}
                  className='form-control'
                  name=''
                  onChange={(e) => setOrientacoes(e.target.value)}
                />
              </FormGroup>


                <FormGroup label='Status: *' htmlFor=''>
                <input
                  type='text'
                  maxLength='11'
                  id=''
                  value={status}
                  className='form-control'
                  name=''
                  onChange={(e) => setStatus(e.target.value)}
                />
              </FormGroup>

               <FormGroup label='Veterinário: *' htmlFor='selectVeterinario'>
                <select
                  className='form-select'
                  id='selectVeterinario'
                  name='idVet'
                  value={idVet}
                  onChange={(e) => setIdVet(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosVet.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>



               <FormGroup label='Animal: *' htmlFor='selectAnimal'>
                <select
                  className='form-select'
                  id='selectAnimal'
                  name='idAnimal'
                  value={idAnimal}
                  onChange={(e) => setIdAnimal(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosAnimais.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroConsultas;