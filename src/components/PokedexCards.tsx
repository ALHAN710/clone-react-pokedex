import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Wrap, WrapItem } from "@chakra-ui/react";
import PokedexSkeleton from "./PokedexSkeleton";
import PokedexCard from "./PokedexCard";
import { TPokemon } from "../types/@pokemon";
import { fetchPokemons } from "../services/api";

type Props = {
  isFetching: boolean;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

const limit = 8;
const initUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=8";

const PokedexCards: React.FC<Props> = ({ isFetching, setShowLoader }) => {
  const [pokemons, setPokemons] = React.useState<TPokemon[] | []>([]);
  const [url, setUrl] = React.useState(initUrl);

  const pokemonsQueryKey = ["pokemons"];

  const queryClient = useQueryClient();

  const { status, data, refetch } = useQuery<any, Error, TPokemon[], string[]>({
    queryKey: pokemonsQueryKey,
    queryFn: async () => {
      return await fetchPokemons(url, limit).then(result => result);
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    // refetchInterval: 120000,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    onSuccess: (data) => {
      console.log("New Pokemons", data);

      setUrl(
        `https://pokeapi.co/api/v2/pokemon/?offset=${pokemons.length + 8}&limit=${limit}`
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
    },
  });

  React.useEffect(() => {
    queryClient.setQueryData(pokemonsQueryKey, [...pokemons]);
  
    return () => {
      
    }
  }, [pokemons]);

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
