import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../redux/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useCustomDispatch: () => Dispatch = useDispatch;
export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;
