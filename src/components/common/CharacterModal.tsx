import { useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside.tsx';

export const CharacterModal = ({
  name,
  height,
  mass,
  birthYear,
  filmsCount,
  homeworld,
  onClickOutside,
}: {
  name: string;
  height: string;
  mass: string;
  birthYear: string;
  filmsCount: number;
  homeworld: {
    name: string;
    terrain: string;
    climate: string;
    residents: number;
  };
  onClickOutside?: () => unknown;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClickOutside = () => {
    setIsOpen(false);
    if (onClickOutside) onClickOutside();
  };
  const wrapperRef = useClickOutside(handleClickOutside);

  return (
    <div className='modal' style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className='modal-content' ref={wrapperRef}>
        <span className='close-btn'>×</span>
        <h2 className='modal-header'>{name}</h2>
        <p>Height: {height}m</p>
        <p>Mass: {mass}kg</p>
        <p>Birth Year: {birthYear}</p>
        <p>Films: {filmsCount}</p>
        <h3>Homeworld</h3>
        <p>{`Name: ${homeworld.name}`}</p>
        <p>{`Terrain: ${homeworld.terrain}`}</p>
        <p>{`Climate: ${homeworld.climate}`}</p>
        <p>{`Residents: ${homeworld.residents}`}</p>
      </div>
    </div>
  );
};
