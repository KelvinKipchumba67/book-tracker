import { useContext } from 'react';
import { BookStateContext, BookDispatchContext } from './contexts';

export const useBookState = () => useContext(BookStateContext);
export const useBookDispatch = () => useContext(BookDispatchContext);
