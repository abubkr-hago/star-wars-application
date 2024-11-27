import { useQuery } from '@tanstack/react-query';
import { swapiQueryKeys } from '../../config';
import { swapiClient } from '../../services';

export const useCharacter = (id: string) => {
  return useQuery({
    queryKey: swapiQueryKeys.character(id),
    queryFn: () => swapiClient.getCharacter(id),
  });
};
