export const swapiQueryKeys = {
  characters: (page: number) => ['characters', page],
  character: (id: string) => ['character', id],
  planets: (id: string) => ['planets', id],
  species: (page: number) => ['species', page],
  speciesById: (id: string) => ['speciesById', id],
};
