import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';
import '../custom.css';

import httpClient from '../config/axios';

function CadastroVeterinarios() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `/veterinarios`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [crmv, setCrmv] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [senha, setSenha] = useState('');

  function inicializar(dadosCarregados = null) {
    if (dadosCarregados == null) {
      setId('');
      setNome('');
      setCpf('');
      setCrmv('');
      setTelefone('');
      setEmail('');
      setCep('');
      setLogradouro('');
      setNumero('');
      setComplemento('');
      setBairro('');
      setCidade('');
      setUf('');
      setSenha('');
    } else {
      setId(dadosCarregados.id);
      setNome(dadosCarregados.nome);
      setCpf(dadosCarregados.cpf);
      setCrmv(dadosCarregados.crmv);
      setTelefone(dadosCarregados.telefone);
      setEmail(dadosCarregados.email);
      setCep(dadosCarregados.cep);
      setLogradouro(dadosCarregados.logradouro);
      setNumero(dadosCarregados.numero);
      setComplemento(dadosCarregados.complemento);
      setBairro(dadosCarregados.bairro);
      setCidade(dadosCarregados.cidade);
      setUf(dadosCarregados.uf);
      setSenha(dadosCarregados.senha);
    }
  }

  async function salvar() {
    const data = { id, nome, cpf, crmv, telefone, email, cep, logradouro, numero, complemento, bairro, cidade, uf, senha };
    
    if (idParam == null) {
      await httpClient.post(baseURL, data)
        .then(function (response) {
          mensagemSucesso(`Veterinário ${nome} cadastrado com sucesso!`);
          navigate(-1);
        })
        .catch(function (error) {
          mensagemErro("Erro ao cadastrar: " + (error.response?.data || "Verifique os dados"));
        });
    } else {
      await httpClient.put(`${baseURL}/${idParam}`, data)
        .then(function (response) {
          mensagemSucesso(`Veterinário ${nome} alterado com sucesso!`);
          navigate(-1);
        })
        .catch(function (error) {
          mensagemErro("Erro ao alterar: " + (error.response?.data || "Verifique os dados"));
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

  useEffect(() => {
    if (idParam != null) {
      buscar();
    }
   
  }, [idParam]);

  return (
    <div className='container'>
      <Card title='Cadastro de Veterinário'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input type='text' id='inputNome' value={nome} className='form-control' name='nome' onChange={(e) => setNome(e.target.value)} />
              </FormGroup>
              <FormGroup label='CPF: *' htmlFor='inputCpf'>
                <input type='text' minLength='11' maxLength='11' id='inputCpf' value={cpf} className='form-control' name='cpf' onChange={(e) => setCpf(e.target.value)} />
              </FormGroup>
              <FormGroup label='CRMV: *' htmlFor='inputCrmv'>
                <input type='text' id='inputCrmv' value={crmv} className='form-control' name='crmv' onChange={(e) => setCrmv(e.target.value)} />
              </FormGroup>
              <FormGroup label='Telefone: *' htmlFor='inputTelefone'>
                <input type='number' id='inputTelefone' value={telefone} className='form-control' name='telefone' onChange={(e) => setTelefone(e.target.value)} />
              </FormGroup>
              <FormGroup label='Email: *' htmlFor='inputEmail'>
                <input type='email' id='inputEmail' value={email} className='form-control' name='email' onChange={(e) => setEmail(e.target.value)} />
              </FormGroup>
              <FormGroup label='CEP:' htmlFor='inputCep'>
                <input type='number' id='inputCep' value={cep} className='form-control' name='cep' onChange={(e) => setCep(e.target.value)} />
              </FormGroup>
              <FormGroup label='Logradouro:' htmlFor='inputLogradouro'>
                <input type='text' id='inputLogradouro' value={logradouro} className='form-control' name='logradouro' onChange={(e) => setLogradouro(e.target.value)} />
              </FormGroup>
              <FormGroup label='Número:' htmlFor='inputNumero'>
                <input type='number' id='inputNumero' value={numero} className='form-control' name='numero' onChange={(e) => setNumero(e.target.value)} />
              </FormGroup>
              <FormGroup label='Complemento:' htmlFor='inputComplemento'>
                <input type='text' id='inputComplemento' value={complemento} className='form-control' name='complemento' onChange={(e) => setComplemento(e.target.value)} />
              </FormGroup>
              <FormGroup label='Bairro:' htmlFor='inputBairro'>
                <input type='text' id='inputBairro' value={bairro} className='form-control' name='bairro' onChange={(e) => setBairro(e.target.value)} />
              </FormGroup>
              <FormGroup label='Cidade:' htmlFor='inputCidade'>
                <input type='text' id='inputCidade' value={cidade} className='form-control' name='cidade' onChange={(e) => setCidade(e.target.value)} />
              </FormGroup>
              <FormGroup label='UF:' htmlFor='inputUf'>
                <input type='text' id='inputUf' value={uf} className='form-control' name='uf' onChange={(e) => setUf(e.target.value)} />
              </FormGroup>
              <FormGroup label='Senha: *' htmlFor='inputSenha'>
                <input type='password' id='inputSenha' value={senha} className='form-control' name='senha' onChange={(e) => setSenha(e.target.value)} />
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

export default CadastroVeterinarios;