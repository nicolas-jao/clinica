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
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [castrado, setCastrado] = useState('');
  const [observações, setObservações] = useState('');
  const [foto, setFoto] = useState('');
  const [idTutor, setTutor] = useState('');
  const [idRaça, setRaça] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setDataNascimento('');
      setSexo('');
      setCastrado('');
      setObservações('');
      setFoto('');
      setTutor('');
      setRaça('');

    } else {
      setId(dados.id);
      setNome(dados.nome);
      setDataNascimento(dados.dataNascimento);
      setSexo(dados.sexo);
      setCastrado(dados.castrado);
      setObservações(dados.observações);
      setFoto(dados.foto);
      setTutor(dados.idTutor);
      setRaça(dados.idRaça);
    }
  }

  async function salvar() {
    let data = { id, nome, dataNascimento, sexo, castrado, observações, foto, idTutor, idRaça };
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
      setNome(dados.nome);
      setDataNascimento(dados.dataNascimento);
      setSexo(dados.sexo);
      setCastrado(dados.castrado);
      setObservações(dados.observações);
      setFoto(dados.foto);
      setTutor(dados.idTutor);
      setRaça(dados.idRaça);
    }
  }

  const [dadosTutor, setDadosTutor] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/tutores`).then((response) => {
      setDadosTutor(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosTutor) return null;

return (
    <div className='container'>
      <Card title='Cadastro de Animal'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data de Nascimento: *' htmlFor='inputData'>
                <input
                  type='text'
                  maxLength='11'
                  id='inputData'
                  value={dataNascimento}
                  className='form-control'
                  name='dataNascimento'
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Sexo: *' htmlFor='inputSexo'>
                <input
                  type='sexo'
                  id='inputSexo'
                  value={sexo}
                  className='form-control'
                  name='sexo'
                  onChange={(e) => setSexo(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Castrado:' htmlFor='inputCastrado'>
                <input
                  type='text'
                  id='inputCastrado'
                  value={castrado}
                  className='form-control'
                  name='castrado'
                  onChange={(e) => setCastrado(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Observações:' htmlFor='inputObs'>
                <input
                  type='text'
                  id='inputObs'
                  value={observações}
                  className='form-control'
                  name='obs'
                  onChange={(e) => setObservações(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Foto:' htmlFor='inputFoto'>
                <input
                  type='text'
                  id='inputFoto'
                  value={foto}
                  className='form-control'
                  name='foto'
                  onChange={(e) => setFoto(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Tutor: *' htmlFor='selectTutor'>
                <select
                  className='form-select'
                  id='selectTutor'
                  name='idTutor'
                  value={idTutor}
                  onChange={(e) => setTutor(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosTutor.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              
               <FormGroup label='Raça: *' htmlFor='selectRaça'>
                <select
                  className='form-select'
                  id='selectRaça'
                  name='idRaça'
                  value={idRaça}
                  onChange={(e) => setRaça(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosTutor.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.id}
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