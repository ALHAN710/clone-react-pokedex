import { ChakraProvider } from "@chakra-ui/react";
import { Container, Box, Heading, Button } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import "./App.css";
import Loader from "./components/Loader";
import ModalPokedexDetail from "./components/ModalPokedexDetail";
import PokedexCards from "./components/PokedexCards";
import PokedexSkeleton from "./components/PokedexSkeleton";
import { ContextAPI, TContextAPI } from "./context/ContextAPI";
import { TPokemon } from "./types/@pokemon";

const queryClient = new QueryClient();

function App() {
  const [first, setFirst] = React.useState(true);
  const [showLoader, setShowLoader] = React.useState(false);
  
  // Get the modal state from the global state context api
  const { open: openModal } = React.useContext(ContextAPI) as TContextAPI;

  const handleClick = async () => {
    setFirst(!first);
    setShowLoader(true);
  };

  // Scroll event listener callback
  const scrollListener = React.useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // scrollTop = scroll depuis le top
    // scrollHeight = scroll total
    // clientHeight = hauteur de la fenêtre, partie visible
    // console.log(scrollTop, scrollHeight, clientHeight);

    if (clientHeight + scrollTop >= scrollHeight - 20) {
      console.log("clientHeight + scrollTop = ", clientHeight + scrollTop);
      console.log("scrollHeight = ", scrollHeight);
      setShowLoader(true);
      // addPoke(6);
    }
  }, []);

  React.useEffect(() => {
    let scrollID: any;
    if (!first) {
      // Gestion du scroll infini
      scrollID = window.addEventListener("scroll", scrollListener);
    }
    // Clean up function
    return () => {
      if(scrollID) window.removeEventListener("scroll", scrollListener);
    };
  }, [first]);

  // console.log(first);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <ModalPokedexDetail />
        <Container
          maxW={"1280px"}
          height={"auto"}
          className="container"
          borderRadius={"md"}
        >
          <Heading as={"h1"} mb="2rem" size={"2xl"}>
            Bienvenue dans le pokédex !
          </Heading>
          <Box as="section" py={"2rem"} px={"5px"} className="section">
            {/* TODO: Put the pokedex list here and the skeleton if isloading first api call request */}
            <PokedexCards
              isFetching={showLoader}
              setShowLoader={setShowLoader}
            />

            {/* TODO: Place more pokedex button here which is visible only for the first call of pokedex api  */}
            {first && (
              <Button colorScheme="linkedin" mb={"2rem"} onClick={handleClick}>
                Charger d'autres pokémons
              </Button>
            )}

            {/* TODO: Place loader pokedex here */}
            {!first && showLoader && <Loader />}
          </Box>
        </Container>
      </ChakraProvider>
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      )}
    </QueryClientProvider>
  );
}

export default App;
