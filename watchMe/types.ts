import { ButtonHTMLAttributes } from 'react';

export interface ContentProps{
    selectedGenreId: number
}

export interface SideBarProps{
    selectedGenreId: number,
    setSelectedGenreId(selectedGenreId: number): void
}

export interface IconProps {
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    color: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    iconName: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    selected: boolean;
}

export interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

export interface MovieCardProps {
    title: string;
    poster: string;
    rating: string;
    runtime: string;
}

export interface MovieProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
}