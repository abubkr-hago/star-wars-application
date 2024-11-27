import { useEffect, useRef } from 'react';

const useClickOutside = (callback: () => unknown) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: { target: unknown }) => {
      // @ts-expect-error ref.current is not null
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Clean up the event listeners when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export default useClickOutside;
