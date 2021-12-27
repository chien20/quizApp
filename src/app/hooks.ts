import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Func } from 'utils/types';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const Dispatch = () => useDispatch<AppDispatch>();
export const Selector: TypedUseSelectorHook<RootState> = useSelector;
