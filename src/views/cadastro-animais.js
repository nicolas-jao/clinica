import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import '../custom.css';

import httpClient, { BASE_URL } from '../config/axios';

function CadastroAnimais() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `/animais`; 

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [castrado, setCastrado] = useState('');
  const [observacoes, setObservacoes] = useState(''); 
  const [foto, setFoto] = useState('');
  const [idTutor, setTutor] = useState('');
  const [idRaca, setRaca] = useState('');

  const [dados, setDados] = React.useState(null);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setDataNascimento('');
      setSexo('');
      setCastrado('');
      setObservacoes('');
      setFoto('');
      setTutor('');
      setRaca('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setDataNascimento(dados.dataNascimento);
      setSexo(dados.sexo);
      setCastrado(dados.castrado);
      setObservacoes(dados.observacoes);
      setFoto(dados.foto);
      setTutor(dados.idTutor);
      setRaca(dados.idRaca);
    }
  }

  async function salvar() {
    const data = { id, nome, dataNascimento, sexo, castrado, observacoes, foto, idTutor, idRaca };
    
    if (idParam == null) {
      await httpClient.post(baseURL, data)
        .then(function (response) {
          mensagemSucesso(`Animal ${nome} cadastrado com sucesso!`);
          navigate(-1);
        })
        .catch(function (error) {
          mensagemErro("Erro ao cadastrar animal: " + error.response?.data);
        });
    } else {
      await httpClient.put(`${baseURL}/${idParam}`, data)
        .then(function (response) {
          mensagemSucesso(`Animal ${nome} alterado com sucesso!`);
          navigate(-1);
        })
        .catch(function (error) {
          mensagemErro("Erro ao alterar animal: " + error.response?.data);
        });
    }
  }

  async function buscar() {
    if (idParam != null) {
      await httpClient.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
       
        const d = response.data;
        setId(d.id);
        setNome(d.nome);
        setDataNascimento(d.dataNascimento);
        setSexo(d.sexo);
        setCastrado(d.castrado);
        setObservacoes(d.observacoes);
        setFoto(d.foto);
        setTutor(d.idTutor);
        setRaca(d.idRaca);
      });
    }
  }

  const [dadosTutor, setDadosTutor] = React.useState(null);
  const [dadosRaca, setDadosRaca] = React.useState(null);

  useEffect(() => {
    httpClient.get(`/tutores`).then((response) => {
      setDadosTutor(response.data);
    });
    httpClient.get(`/racas`).then((response) => {
      setDadosRaca(response.data);
    });
    if (idParam != null) {
        buscar();
    }
  }, []);

  if (!dadosTutor || !dadosRaca) return null;

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
                  type='date'
                  id='inputData'
                  value={dataNascimento}
                  className='form-control'
                  name='dataNascimento'
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </FormGroup>
              {/* */}
              <button onClick={salvar} type='button' className='btn btn-success'>Salvar</button>
              <button onClick={inicializar} type='button' className='btn btn-danger'>Cancelar</button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroAnimais;