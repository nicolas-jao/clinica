import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';


import httpClient from '../config/axios';

function CadastroConsultas() {
  const { idParam } = useParams();
  const navigate = useNavigate();


  const baseURL = `/consultas`;

  const [id, setId] = useState('');
  const [dia, setDia] = useState('');
  const [orientacoes, setOrientacoes] = useState('');
  const [status, setStatus] = useState('');
  const [idVet, setIdVet] = useState('');
  const [nomeVet, setNomeVet] = useState('');
  const [idAnimal, setIdAnimal] = useState('');
  const [nomeAnimal, setNomeAnimal] = useState('');

  
  function inicializar(dadosCarregados = null) {
    if (dadosCarregados == null) {
      setId('');
      setDia('');
      setOrientacoes('');
      setStatus('');
      setIdVet('');
      setNomeVet('');
      setIdAnimal('');
      setNomeAnimal('');
    } else {
      setId(dadosCarregados.id);
      setDia(dadosCarregados.dia); 
      setOrientacoes(dadosCarregados.orientacoes);
      setStatus(dadosCarregados.status);
      setIdVet(dadosCarregados.idVet);
      setNomeVet(dadosCarregados.nomeVet);
      setIdAnimal(dadosCarregados.idAnimal);
      setNomeAnimal(dadosCarregados.nomeAnimal);
    }
  }

  async function salvar() {
    const data = { id, dia, orientacoes, status, idVet, nomeVet, idAnimal, nomeAnimal };
    
    if (idParam == null) {
      await httpClient.post(baseURL, data)
        .then(function (response) {
          mensagemSucesso(`Consulta cadastrada com sucesso!`);
          navigate(-1);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data || "Erro ao cadastrar");
        });
    } else {
      await httpClient.put(`${baseURL}/${idParam}`, data)
        .then(function (response) {
          mensagemSucesso(`Consulta alterada com sucesso!`);
          navigate(-1);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data || "Erro ao alterar");
        });
    }
  }

  async function buscar() {
    if (idParam != null) {
      await httpClient.get(`${baseURL}/${idParam}`).then((response) => {
        
        inicializar(response.data);
      });
    }
  }

  const [dadosVet, setDadosVet] = React.useState(null);
  const [dadosAnimais, setDadosAnimais] = React.useState(null);

  useEffect(() => {
    
    httpClient.get(`/veterinarios`).then((response) => {
      setDadosVet(response.data);
    });
    httpClient.get(`/animais`).then((response) => {
      setDadosAnimais(response.data);
    });
    
    if (idParam != null) {
        buscar();
    }
  }, []);

  if (!dadosVet || !dadosAnimais) return null;

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
                  onChange={(e) => setDia(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Orientacoes: *' htmlFor='inputOrientacoes'>
                <input
                  type='text'
                  maxLength='50'
                  id='inputOrientacoes'
                  value={orientacoes}
                  className='form-control'
                  onChange={(e) => setOrientacoes(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Status: *' htmlFor='inputStatus'>
                <input
                  type='text'
                  maxLength='11'
                  id='inputStatus'
                  value={status}
                  className='form-control'
                  onChange={(e) => setStatus(e.target.value)}
                />
              </FormGroup>

               <FormGroup label='Veterinário: *' htmlFor='selectVeterinario'>
                <select
                  className='form-select'
                  id='selectVeterinario'
                  value={idVet}
                  onChange={(e) => setIdVet(e.target.value)}
                >
                  <option value='0'> </option>
                  {dadosVet.map((dado) => (
                      <option key={dado.id} value={dado.id}>{dado.nome}</option>
                  ))}
                </select>
              </FormGroup>

               <FormGroup label='Animal: *' htmlFor='selectAnimal'>
                <select
                  className='form-select'
                  id='selectAnimal'
                  value={idAnimal}
                  onChange={(e) => setIdAnimal(e.target.value)}
                >
                  <option value='0'> </option>
                  {dadosAnimais.map((dado) => (
                      <option key={dado.id} value={dado.id}>{dado.nome}</option>
                  ))}
                </select>
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} type='button' className='btn btn-success'>Salvar</button>
                <button onClick={() => inicializar()} type='button' className='btn btn-danger'>Cancelar</button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroConsultas;