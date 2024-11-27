import { useQuery } from '@tanstack/react-query';
import { swapiQueryKeys } from '../../config';
import { swapiClient } from '../../services';

export const useSpecies = (page: number) => {
  return useQuery({
    queryKey: swapiQueryKeys.species(page),
    queryFn: () => swapiClient.getSpecies(page),
  });
};
