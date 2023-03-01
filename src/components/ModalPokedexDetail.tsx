import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { ContextAPI, TContextAPI } from "../context/ContextAPI";
import { defaultPokemon, TPokemon } from "../types/@pokemon";
import { formatID } from "./PokedexCard";

type Props = {
  // allPokemons: TPokemon[] | [];
};

const ModalPokedexDetail: React.FC<Props> = ({}) => {
  const {
    open: showModal,
    setOpen,
    pokemonDetailID: id,
    setPokemonDetailID,
  } = React.useContext(ContextAPI) as TContextAPI;

  const queryClient = useQueryClient();

  const allPokemons =
    queryClient.getQueryData<TPokemon[] | []>(["pokemons"]) || [];

  const pokemon = (id > 0 && allPokemons.length > 0) ? allPokemons.filter(poke => poke.id === id)[0] : defaultPokemon;
  console.log("allPokemons Modal", allPokemons);
  console.log("Pokemon ID Modal", id);
  return pokemon && pokemon.id > 0 ? (
    <dialog open={showModal}>
      {/* <Flex
        dir="row"
        gap={"0px"}
        w="100%"
        bg={"#fff"}
        className="pokemon-detail-navigation"
      >
        <Box
          as="a"
          bg={"#a4a4a4"}
          display={"inline-block"}
          w="50%"
          m="0"
          borderEnd={"4px solid #fff"}
          href="#"
          className="previous"
        >
          <Box as="div" className="pokedex-wrapper">
            <span className="icon icon_arrow_left"></span>
            <span className="pokemon_id mr-2">
              No.&nbsp;{" "}
              {pokemon.id - 1 > 0
                ? pokemon.id - 1
                : allPokemons.length > 0
                ? allPokemons[allPokemons.length - 1].id
                : ""}
            </span>
            <span className="pokemon_name">{pokemon.name}</span>
          </Box>
        </Box>
        <a href="#" className=""></a>
      </Flex> */}
      <Container
        maxW={"1280px"}
        height={"auto"}
        className="container"
        borderRadius={"md"}
      >
        <Heading
          as={"h1"}
          color="black"
          mb="2rem"
          size={{ sm: "lg", md: "2xl" }}
        >
          {pokemon.name} No.&nbsp; {formatID(pokemon.id!)}
        </Heading>
        <Box as="section" py={"2rem"} px={"5px"} className="section">
          <Card
            direction={{ base: "column", sm: "column", md: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Box bg="#F2F2F2" p="0.5rem" borderRadius="lg" w={{ base: "50%", sm: "100%", md: "50%"}}>
              <Image
                // src={"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/085.png"}
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formatID(
                  pokemon.id!,
                  3
                )}.png`}
                alt={pokemon.name + " picture"}
                w="100%"
                // maxW={{ base: "100%", sm: "200px" }}
                objectFit={"cover"}
              />
            </Box>

            <Stack>
              <CardBody>
                {/* <Heading size="md">{}</Heading> */}

                <Text>
                  Il y a une graine sur son dos depuis sa naissance. Elle
                  grossit un peu chaque jour.
                </Text>

                <HStack as="div" mt={"2rem"}>
                  <span>Versions : </span>

                  <img
                    src="/img/pokeball_gray.png"
                    alt="blue pokeball"
                    width={"30px"}
                    height={"30px"}
                  />

                  <img
                    color="#dd2d51"
                    src="/img/pokeball_gray.png"
                    alt="red pokeball"
                    width={"30px"}
                    height={"30px"}
                  />
                </HStack>
                <Flex
                  as="div"
                  bg={"#30a7d7"}
                  w="100%"
                  my="2rem"
                  borderRadius={"10px"}
                  minH={"243px"}
                  color={"#fff"}
                >
                  <Flex
                    w="50%"
                    direction={"column"}
                    justify={"space-between"}
                    align={"flex-start"}
                    textAlign="start"
                    p="1rem"
                  >
                    <Box>
                      <div className="pokemon-detail-value-title">Taille</div>
                      <div className="pokemon-detail-value">
                        {pokemon.height}&nbsp;m
                      </div>
                    </Box>
                    <Box>
                      <div className="pokemon-detail-value-title">Poids</div>
                      <div className="pokemon-detail-value">
                        {pokemon.weight}&nbsp;kg
                      </div>
                    </Box>
                    <Box>
                      <div className="pokemon-detail-value-title">Sexe</div>
                      <div className="pokemon-detail-value">Male, Femelle</div>
                    </Box>
                  </Flex>
                  <Flex
                    w="50%"
                    direction={"column"}
                    rowGap={"2rem"}
                    align={"flex-start"}
                    textAlign="start"
                    p="1rem"
                  >
                    <Box>
                      <div className="pokemon-detail-value-title">
                        Catégorie
                      </div>
                      <div className="pokemon-detail-value">Graine</div>
                    </Box>
                    <Box>
                      <div className="pokemon-detail-value-title">Talent</div>
                      <div className="pokemon-detail-value">Engrais</div>
                    </Box>
                  </Flex>
                </Flex>
              </CardBody>

              <CardFooter justify={"center"} mb="1px">
                <Button
                  variant="solid"
                  colorScheme="linkedin"
                  mb={"2rem"}
                  onClick={() => setOpen(false)}
                >
                  Fermer
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </Box>
      </Container>
    </dialog>
  ) : (
    <></>
  );
};

export default ModalPokedexDetail;
