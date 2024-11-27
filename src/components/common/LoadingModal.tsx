import { useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside.tsx';
import { Loading } from './Loading.tsx';
import { Error } from './Error.tsx';

export const LoadingModal = ({
  isError = false,
  errorMessage,
  onClickOutside,
  retry,
}: {
  isError: boolean;
  errorMessage?: string;
  onClickOutside?: () => unknown;
  retry?: () => unknown;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClickOutside = () => {
    setIsOpen(false);
    if (onClickOutside) onClickOutside();
  };
  const wrapperRef = useClickOutside(handleClickOutside);

  return (
    <div className='modal' style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className='modal-content' ref={wrapperRef}>
        {isError ? <Error message={errorMessage} retry={retry} /> : <Loading />}
      </div>
    </div>
  );
};
