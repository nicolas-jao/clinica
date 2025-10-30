import React from 'react';

import Login from './views/login';

import ListagemVeterinarios from './views/listagem-veterinarios';
import CadastroVeterinarios from './views/cadastro-veterinarios';

import ListagemTutores from './views/listagem-tutores';
import CadastroTutores from './views/cadastro-tutores';

import ListagemAnimais from './views/listagem-animais';
import CadastroAnimais from './views/cadastro-animais';

/*import ListagemEspecies from './views/listagem-especies';
import CadastroEspecies from './views/cadastro-especies';

import ListagemRaças from './views/listagem-raças';
import CadastroRaças from './views/cadastro-raças';
*/

/*
        <Route path='/cadastro-especies/:idParam?' element={<CadastroEspecies />} />
        <Route path='/listagem-especies' element={<ListagemEspecies />} />

        <Route path='/cadastro-raças/:idParam?' element={<CadastroRaças />} />
        <Route path='/listagem-raças' element={<ListagemRaças />} />
*/



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
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
