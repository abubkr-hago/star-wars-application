import { AlertCircle } from 'lucide-react';

export const Error = ({
  message = 'Something went wrong',
  retry,
}: {
  message?: string;
  retry?: () => unknown;
}) => (
  <div className='flex flex-col items-center justify-center p-6 space-y-4'>
    <div className='rounded-full bg-red-100 p-3'>
      <AlertCircle className='h-6 w-6 text-red-600' />
    </div>
    <div className='text-center'>
      <h3 className='text-lg font-semibold text-gray-900 mb-1'>Error</h3>
      <p className='text-gray-600 text-sm'>{message}</p>
    </div>
    {retry && (
      <button
        onClick={retry}
        className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm'
      >
        Try Again
      </button>
    )}
  </div>
);
