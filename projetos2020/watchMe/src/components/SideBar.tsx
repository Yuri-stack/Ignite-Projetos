import { useCallback, useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void;
}

export function SideBar({ selectedGenreId, setSelectedGenreId }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  // Faz a requisição dos Genêros aqui, pois somente aqui são importantes
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  // Função Callback, que pega o ID do Gênero e passa para o App
  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, [selectedGenreId])

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}