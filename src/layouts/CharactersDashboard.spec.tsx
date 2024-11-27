/* eslint-disable @typescript-eslint/no-explicit-any */
import { Character, Planet } from '../interfaces';
import { useCharacters, usePlanet } from '../hooks';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { CharactersDashboard } from './CharactersDashboard.tsx';
import { getCharacterBirthYear } from '../utils';

// Mock the custom hooks
vi.mock('../hooks', () => ({
  useCharacters: vi.fn(),
  usePlanet: vi.fn(),
}));

// Mock sample data
const mockCharacter: Character = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  birth_year: '19BBY',
  homeworld: 'https://swapi.dev/api/planets/1/',
  films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/'],
  species: [],
  vehicles: [],
  starships: [],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.dev/api/people/1/',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  gender: 'male',
};

const mockPlanet: Planet = {
  name: 'Tatooine',
  rotation_period: '23',
  orbital_period: '304',
  diameter: '10465',
  climate: 'arid',
  gravity: '1 standard',
  terrain: 'desert',
  surface_water: '1',
  population: '200000',
  residents: ['https://swapi.dev/api/people/1/'],
  films: ['https://swapi.dev/api/films/1/'],
  created: '2014-12-09T13:50:49.641000Z',
  edited: '2014-12-20T20:58:18.411000Z',
  url: 'https://swapi.dev/api/planets/1/',
};

describe('Characters Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays loading state initially', async () => {
    (useCharacters as any).mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    render(<CharactersDashboard />);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('displays error state with retry button', () => {
    const mockRefetch = vi.fn();
    (useCharacters as any).mockReturnValue({
      isLoading: false,
      isError: true,
      error: { message: 'Failed to fetch' },
      refetch: mockRefetch,
    });

    render(<CharactersDashboard />);

    expect(screen.getByText(/Try Again/i)).toBeInTheDocument();
    const retryButton = screen.getByRole('button', { name: /Try Again/i });
    fireEvent.click(retryButton);
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('displays character cards and handles pagination', () => {
    (useCharacters as any).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        count: 3,
        results: [mockCharacter],
      },
    });

    render(<CharactersDashboard />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(useCharacters).toHaveBeenCalledWith(2);
  });

  it('opens character modal when clicking on a character card', async () => {
    (useCharacters as any).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        count: 10,
        results: [mockCharacter],
      },
    });

    (usePlanet as any).mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockPlanet,
    });

    render(<CharactersDashboard />);

    const characterCard = screen.getByText('Luke Skywalker');
    fireEvent.click(characterCard);

    await waitFor(() => {
      expect(screen.getByText('Height: 1.72m')).toBeInTheDocument();
      expect(screen.getByText('Mass: 77kg')).toBeInTheDocument();
      expect(
        screen.getByText(`Birth Year: ${getCharacterBirthYear('19BBY')}`),
      ).toBeInTheDocument();
      expect(screen.getByText('Films: 2')).toBeInTheDocument();
      expect(screen.getByText('Name: Tatooine')).toBeInTheDocument();
      expect(screen.getByText('Terrain: desert')).toBeInTheDocument();
      expect(screen.getByText('Climate: arid')).toBeInTheDocument();
      expect(screen.getByText('Residents: 1')).toBeInTheDocument();
    });
  });

  it('handles planet loading state in modal', async () => {
    (useCharacters as any).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        count: 10,
        results: [mockCharacter],
      },
    });

    (usePlanet as any).mockReturnValue({
      isLoading: true,
      isError: false,
    });

    render(<CharactersDashboard />);

    const characterCard = screen.getByText('Luke Skywalker');
    fireEvent.click(characterCard);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('handles planet error state in modal', async () => {
    (useCharacters as any).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        count: 10,
        results: [mockCharacter],
      },
    });

    const planetRefetch = vi.fn();
    (usePlanet as any).mockReturnValue({
      isLoading: false,
      isError: true,
      failureReason: { message: 'Failed to fetch planet' },
      refetch: planetRefetch,
    });

    render(<CharactersDashboard />);

    const characterCard = screen.getByText('Luke Skywalker');
    fireEvent.click(characterCard);

    const retryButton = screen.getByRole('button', { name: /Try Again/i });
    fireEvent.click(retryButton);
    expect(planetRefetch).toHaveBeenCalled();
  });

  it('prevents pagination beyond bounds', () => {
    (useCharacters as any).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        count: 1,
        results: [mockCharacter],
      },
    });

    render(<CharactersDashboard />);

    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    // Should still be on page 1
    expect(useCharacters).toHaveBeenLastCalledWith(1);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    // Should stay on page 1 since there's only one page
    expect(useCharacters).toHaveBeenLastCalledWith(1);
  });
});
