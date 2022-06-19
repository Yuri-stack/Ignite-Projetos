import { useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

export function App() {
  
  const [selectedGenreId, setSelectedGenreId] = useState(1);  // Inicia o ID dos generos em 1, Ação

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar 
        selectedGenreId = { selectedGenreId }         // Passa para a Props. da SideBar o valor inicial
        setSelectedGenreId = { setSelectedGenreId }   // Passa para a Props. da SideBar a var. p/ alterar o valor inicial
      />

      <Content 
        selectedGenreId = { selectedGenreId }         // Passa para a Props. do Content o valor selecionado dentro da Sidebar
      />
    </div>
  )
}