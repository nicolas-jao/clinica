import React from 'react';

import Login from './views/login';

import ListagemVeterinarios from './views/listagem-veterinarios';
import CadastroVeterinarios from './views/cadastro-veterinarios';
import InfoVeterinarios from './views/info-veterinarios'

import ListagemTutores from './views/listagem-tutores';
import CadastroTutores from './views/cadastro-tutores';
import InfoTutores from './views/info-tutores'

import ListagemAnimais from './views/listagem-animais';
import CadastroAnimais from './views/cadastro-animais';
import InfoAnimais from './views/info-animais'

import ListagemEspecies from './views/listagem-especies';
import CadastroEspecies from './views/cadastro-especies';

import ListagemRaças from './views/listagem-raças';
import CadastroRaças from './views/cadastro-raças';

import ListagemConsultas from './views/listagem-consultas';
import CadastroConsultas from './views/cadastro-consultas';
import InfoConsultas from './views/info-consultas'

import ListagemProcedimentos from './views/listagem-procedimentos';
import CadastroProcedimentos from './views/cadastro-procedimentos';

import BuscaRaças from './views/busca-raça';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route path='/cadastro-veterinarios/:idParam?' element={<CadastroVeterinarios />} />
        <Route path='/listagem-veterinarios' element={<ListagemVeterinarios />} />
        <Route path='/info-veterinarios/:idParam?' element={<InfoVeterinarios />} />

        <Route path='/cadastro-tutores/:idParam?' element={<CadastroTutores />} />
        <Route path='/listagem-tutores' element={<ListagemTutores />} />
        <Route path='/info-tutores/:idParam?' element={<InfoTutores />} />
        
        <Route path='/cadastro-animais/:idParam?' element={<CadastroAnimais />} />
        <Route path='/listagem-animais' element={<ListagemAnimais />} />
        <Route path='/info-animais/:idParam?' element={<InfoAnimais />} />
      
        <Route path='/cadastro-especies/:idParam?' element={<CadastroEspecies />} />
        <Route path='/listagem-especies' element={<ListagemEspecies />} />

        <Route path='/cadastro-raças/:idParam?' element={<CadastroRaças />} />
        <Route path='/listagem-raças' element={<ListagemRaças />} />

        <Route path='/cadastro-consultas/:idParam?' element={<CadastroConsultas />} />
        <Route path='/listagem-consultas' element={<ListagemConsultas />} />
        <Route path='/info-consultas/:idParam?' element={<InfoConsultas />} />

        <Route path='/cadastro-procedimentos/:idParam?' element={<CadastroProcedimentos />} />
        <Route path='/listagem-procedimentos' element={<ListagemProcedimentos />} />

        <Route path="/busca-raça/:idParam" element={<BuscaRaças />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
