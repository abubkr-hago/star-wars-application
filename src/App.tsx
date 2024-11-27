import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/tanstack-query.ts';
import { CharactersDashboard } from './layouts/CharactersDashboard.tsx';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <a target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Star Wars Application</h1>
      <CharactersDashboard />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
