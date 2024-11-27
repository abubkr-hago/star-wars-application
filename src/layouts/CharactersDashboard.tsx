import { useCharacters, usePlanet } from '../hooks';
import { CharacterCard, CharacterModal } from '../components';
import { Error } from '../components/common/Error.tsx';
import { Loading } from '../components/common/Loading.tsx';
import {
  extractPlanetIdFromURL,
  getCharacterBirthYear,
  stringToColor,
} from '../utils';
import { Character } from '../interfaces';
import { LoadingModal } from '../components/common/LoadingModal.tsx';
import { useState } from 'react';

export const CharactersDashboard = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, refetch } = useCharacters(page);
  const [characterData, setCharacterData] = useState<Character>();
  const [planetId, setPlanetId] = useState<number>(-1);
  const planet = usePlanet(planetId.toString());

  const totalPages = data
    ? Math.ceil(data.count / data.results?.length || 10)
    : 0;

  return (
    <div className='container mx-auto p-4'>
      {isError ? (
        <Error message={error.message} retry={refetch} />
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
          {data?.results.map((character, index) => (
            <CharacterCard
              key={index}
              name={character.name}
              backgroundColor={stringToColor(
                character.species?.sort()?.join(''),
              )}
              imageSrc={`https://picsum.photos/200`}
              onClick={() => {
                setCharacterData(character);
                setPlanetId(extractPlanetIdFromURL(character.homeworld));
              }}
            />
          ))}
        </div>
      )}
      {planetId > 0 &&
        characterData &&
        (planet.isLoading || planet.isError ? (
          <LoadingModal
            retry={planet.refetch}
            onClickOutside={() => setPlanetId(-1)}
            isError={planet.isError}
            errorMessage={planet.failureReason?.message}
          />
        ) : (
          planet.data && (
            <CharacterModal
              name={characterData.name}
              height={`${parseFloat(characterData.height) / 100}`}
              mass={characterData.mass}
              birthYear={getCharacterBirthYear(characterData.birth_year)}
              filmsCount={characterData.films?.length || 0}
              homeworld={{
                name: planet.data.name,
                climate: planet.data.climate,
                terrain: planet.data.terrain,
                residents: planet.data.residents?.length || 0,
              }}
              onClickOutside={() => setPlanetId(-1)}
            />
          )
        ))}
      <div className='flex justify-between items-center'>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
          Previous
        </button>
        <span className='text-gray-600' style={{ margin: '4rem' }}>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
          Next
        </button>
      </div>
    </div>
  );
};
