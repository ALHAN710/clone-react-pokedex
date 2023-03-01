import { defaultPokemon, TPokemon } from "../types/@pokemon";

type TPokedex = {
  url: string;
  name: string;
};

export async function fetchPokemons(url: string, limit = 22): Promise<TPokemon[]> {
  let tableauFin: TPokemon[] = [];
  console.log("url : " + url);
  try {
    const response = await fetch(
      url
      // `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`
    );

    if (response.ok) {
      const pokemons = await response.json();
      // console.log(pokemons);
      // console.log(pokemons.results);

      let allPokemon: any = [];
      for (let index = 0; index < pokemons.results.length; index++) {
        const pokemon_ = await fetchPokemon(pokemons.results[index]);

        // On ajoute le pokémon dans le tableau de pokémons
        if (pokemon_) {
          // console.log("pokemon :", pokemon_);
          allPokemon.push(pokemon_);
          // console.log(allPokemon);
        }
        
      }
      /*await pokemons.results.forEach(async (pokedex: TPokedex) => {
        const pokemon_ = await fetchPokemon(pokedex);
        

        // On ajoute le pokémon dans le tableau de pokémons
        if (pokemon_) {
          // console.log("pokemon :", pokemon_);
          allPokemon.push(pokemon_);
          console.log(allPokemon);
        }
        
      });*/
      
      // console.log(allPokemon);

      if (allPokemon.length === limit) {
        // console.log("All Pokemon "+limit);
        // console.log(allPokemon);
        // console.log("================ END ================");

        //On trie le tableau de Pokémon par ordre croissant d'ID avec la méthode sort
        tableauFin = allPokemon.sort((a: any, b: any) => a.id - b.id);
        // console.log(tableauFin);
      }
    }
  } catch (error) {
    console.log(error);
  }

  return [...tableauFin];
}

async function fetchPokemon(pokedex: TPokedex): Promise<TPokemon> {
  const { url, name: nameP } = pokedex;
  let pokemon: TPokemon = defaultPokemon;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const pokeData = await response.json();
      // console.log("pokeData : " + pokeData.types);
      // console.log(pokeData);
      pokemon.pic = pokeData.sprites.front_default as string;
      // console.log(pokeData.types);
      // TODO: get all type of pokemon
      pokemon.types = pokeData.types.map((obj: any) => obj.type.name);
      // console.log(pokemon.types);

      pokemon.id = pokeData.id;
      pokemon.weight = pokeData.weight/10.0; // en kg
      pokemon.height = pokeData.height/10.0; // en mètres

      const resp = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${nameP}`
      );
      if (resp.ok) {
        const result = await resp.json();
        //On récupère le nom en français du pokémon
        pokemon.name =
          result.names.filter((obj: any) => obj.language.name === "fr")[0]
            .name || "";
        // console.log(pokemon.name);
      }
    }
  } catch (error) {}

  return {...pokemon};
}
