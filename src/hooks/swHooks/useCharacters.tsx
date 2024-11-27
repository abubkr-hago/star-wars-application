import { useQuery } from '@tanstack/react-query';
import { swapiClient } from '../../services';
import { swapiQueryKeys } from '../../config';

export const useCharacters = (page: number) => {
  return useQuery({
    queryKey: swapiQueryKeys.characters(page),
    queryFn: () => swapiClient.getCharacters(page),
  });
};
