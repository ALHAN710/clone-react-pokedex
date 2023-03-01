import React, { ReactNode } from "react";
import { defaultPokemon, TPokemon } from "../types/@pokemon";

export type Props = {
  children: ReactNode;
};

type TModalContext = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pokemonDetailID: number;
  setPokemonDetailID: React.Dispatch<React.SetStateAction<number>>;
};

export type TContextAPI = TModalContext;

export const ContextAPI = React.createContext<TContextAPI | null>(null);

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [pokemonDetailID, setPokemonDetailID] = React.useState(-1);

  return (
    <ContextAPI.Provider
      value={{ open, setOpen, pokemonDetailID, setPokemonDetailID }}
    >
      {children}
    </ContextAPI.Provider>
  );
};
