import React from 'react';

import Login from './views/login';

import ListagemVeterinarios from './views/listagem-veterinarios';
import CadastroVeterinarios from './views/cadastro-veterinarios';

import ListagemTutores from './views/listagem-tutores';
import CadastroTutores from './views/cadastro-tutores';

import ListagemAnimais from './views/listagem-animais';
import CadastroAnimais from './views/cadastro-animais';

import ListagemEspecies from './views/listagem-especies';
import CadastroEspecies from './views/cadastro-especies';

import ListagemRaças from './views/listagem-raças';
import CadastroRaças from './views/cadastro-raças';

import ListagemConsultas from './views/listagem-consultas';
import CadastroConsultas from './views/cadastro-consultas';

import ListagemProcedimentos from './views/listagem-procedimentos';
import CadastroProcedimentos from './views/cadastro-procedimentos';



import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route path='/cadastro-veterinarios/:idParam?' element={<CadastroVeterinarios />} />
        <Route path='/listagem-veterinarios' element={<ListagemVeterinarios />} />

        <Route path='/cadastro-tutores/:idParam?' element={<CadastroTutores />} />
        <Route path='/listagem-tutores' element={<ListagemTutores />} />
        
        <Route path='/cadastro-animais/:idParam?' element={<CadastroAnimais />} />
        <Route path='/listagem-animais' element={<ListagemAnimais />} />
      
        <Route path='/cadastro-especies/:idParam?' element={<CadastroEspecies />} />
        <Route path='/listagem-especies' element={<ListagemEspecies />} />

        <Route path='/cadastro-raças/:idParam?' element={<CadastroRaças />} />
        <Route path='/listagem-raças' element={<ListagemRaças />} />

        <Route path='/cadastro-consultas/:idParam?' element={<CadastroConsultas />} />
        <Route path='/listagem-consultas' element={<ListagemConsultas />} />

        <Route path='/cadastro-procedimentos/:idParam?' element={<CadastroProcedimentos />} />
        <Route path='/listagem-procedimentos' element={<ListagemProcedimentos />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
