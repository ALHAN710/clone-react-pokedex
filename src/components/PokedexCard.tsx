import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Box,
  Flex,
  Text,
  Heading,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import {
  pokemonTypeColor,
  pokemonTypeFrench,
  TPokemon,
} from "../types/@pokemon";
import { ContextAPI, TContextAPI } from "../context/ContextAPI";

type Props = {
  pokemon: TPokemon;
};

export const formatID = (id: number, lgth = 4) => {
  let strID = "";

  const diff = lgth - id.toString().length;
  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      strID += "0";
    }
    // strID = Array.from({length: (lgth - id.toString().length) }, (v, k) => 0).join("");
  }
  // console.log(strID);
  return strID + id;
  // return `No. ${strID + id}`;
};

const PokedexCard: React.FC<Props> = ({ pokemon }) => {
  const {
    setOpen,
    setPokemonDetailID,
  } = React.useContext(ContextAPI) as TContextAPI;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Show the modal
    setOpen(true);
    console.log("Pokemon ID Selected", pokemon.id);
    // Set the id of pokemon to show
    setPokemonDetailID(pokemon.id);
  }
  return (
    <Card
      maxW="sm"
      height="auto"
      width={"240px"}
      variant={"unstyled"}
      bg="transparent"
      _hover={{ variant: "elevated", bg: "", transform: "translateY(-10px)" }}
    >
      <CardBody m={"0"}>
        {/* https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png  */}
        <Box bg="#F2F2F2" p="0.5rem" borderRadius="lg">
          <a href="#" onClick={handleClick}>
            <Image
              // src={"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/085.png"}
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formatID(
                pokemon.id!,
                3
              )}.png`}
              alt={pokemon.name + " picture"}
              width={"100%"}
              objectFit={"cover"}
              // height={"90%"}
            />
          </a>
        </Box>
        <Flex my="1" gap="2" direction={"column"} pl="1.25rem" align={"start"}>
          <Text as={"p"}>No.&nbsp;{" "}{formatID(pokemon.id!)}</Text>

          <Heading
            as={"h5"}
            color="#313131"
            textTransform={"none"}
            mb="5px"
            fontSize={{ sm: "115%", md: "145%" }}
            size={"sm"}
          >
            {pokemon.name}
          </Heading>
        </Flex>
      </CardBody>

      {/* <Divider /> */}

      <CardFooter pl="1.25rem">
        <Flex className="abilities" width="100%" gap="2px">
          {pokemon.types.map((type, index) => {
            // console.log(pokemonTypeColor[type]);
            return (
              <span
                key={`pokemon-${pokemon.name}-type-${type}`}
                style={{ backgroundColor: `${pokemonTypeColor[type]}` }}
              >
                {pokemonTypeFrench[type]}
              </span>
            );
          })}
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default PokedexCard;
