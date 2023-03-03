import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Wrap, WrapItem } from "@chakra-ui/react";
import PokedexSkeleton from "./PokedexSkeleton";
import PokedexCard from "./PokedexCard";
import { TPokemon } from "../types/@pokemon";
import { fetchPokemons } from "../services/api";
import { useToast } from '@chakra-ui/react';

type Props = {
  isFetching: boolean;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMoreButton: React.Dispatch<React.SetStateAction<boolean | string>>;
};

const limit = 12;
const initUrl = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`;

const PokedexCards: React.FC<Props> = ({ isFetching, setShowLoader, setShowMoreButton }) => {
  const [pokemons, setPokemons] = React.useState<TPokemon[] | []>([]);
  const [url, setUrl] = React.useState(initUrl);
  const [firstQuery, setFirstQuery] = React.useState(true);

  const toast = useToast();

  const pokemonsQueryKey = ["pokemons"];

  const queryClient = useQueryClient();

  const { status, data, isRefetching, isInitialLoading, refetch } = useQuery<any, Error, TPokemon[], string[]>({
    queryKey: pokemonsQueryKey,
    queryFn: async () => {
      return await fetchPokemons(url, limit).then(result => result);
    },
    enabled: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    // refetchInterval: 120000,
    retry: 0,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    onSuccess: (data) => {
      console.log("New Pokemons", data);

      setUrl(
        `https://pokeapi.co/api/v2/pokemon/?offset=${pokemons.length + limit}&limit=${limit}`
      );

      setPokemons((oldPokemons) => [...oldPokemons, ...data]);

      // Hide pokedex loader
      setShowLoader(false);
    },
    onError: (error) => {
      console.log("Error getting pokemons");
      console.log(error);

      // Hide pokedex loader
      setShowLoader(false);

      // Show get more pokemons button
      setShowMoreButton(true);

      // Display toast error message
      toast({
        title: 'Error',
        description: "Une erreur inattendue s'est produite lors de la récupération des données !",
        status: 'error',
        variant: 'top-accent',
        position: 'bottom-left',
        duration: 9000,
        isClosable: true,
      })
    },
  });

  React.useEffect(() => {
    
    if(!isInitialLoading) queryClient.setQueryData(pokemonsQueryKey, [...pokemons]);
  
    return () => {
      
    }
  }, [pokemons]);

  // console.log("isInitialLoading", isInitialLoading);
  // use the isFetching change value to launch the query for fetching a new pokemons
  React.useEffect(() => {
    if (isFetching && pokemons.length < 1279) {
      refetch();
    }

    return () => {};
  }, [isFetching]);

  const loading = status === "loading" ? true : false;
  // console.log("status", status);
  // console.log("loading", loading);
  return (
    <Wrap
      flexWrap={"wrap"}
      mb={"2rem"}
      spacingX={"1rem"}
      spacingY={"2rem"}
      justify={"center"}
    >
      {loading
        ? Array.from({ length: 8 }).map((item, index) => (
            <WrapItem key={`pokedex-skeleton-${index}`}>
              <PokedexSkeleton />
            </WrapItem>
          ))
        : pokemons.map((pokemon) => (
            <WrapItem key={"pokemonItem-" + pokemon.id}>
              <PokedexCard pokemon={pokemon} />
            </WrapItem>
          ))}
    </Wrap>
  );
};

export default PokedexCards;
