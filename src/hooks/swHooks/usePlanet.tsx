import { useQuery } from '@tanstack/react-query';
import { swapiQueryKeys } from '../../config';
import { swapiClient } from '../../services';

export const usePlanet = (id: string) => {
  return useQuery({
    queryKey: swapiQueryKeys.planets(id),
    queryFn: () => swapiClient.getPlanet(id),
    enabled: parseInt(id) > 0,
  });
};
