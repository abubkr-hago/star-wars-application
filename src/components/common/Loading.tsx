import { Loader2 } from 'lucide-react';

export const Loading = () => (
  <div className='flex flex-col items-center justify-center p-4 space-y-2'>
    <Loader2 className='h-8 w-8 animate-spin text-blue-500' />
    <p className='text-gray-600 text-sm'>Loading...</p>
  </div>
);
