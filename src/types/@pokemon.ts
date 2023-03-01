export type TPokemon = {
    name: string;
    pic: string;
    types: string[];
    id: number;
    weight: number;
    height: number;
}

export const defaultPokemon: TPokemon = {
    name: "",
    id: 0,
    pic: "",
    types: [""],
    weight: 0,
    height: 0
  };

export const pokemonTypeColor: {[name: string]: string} = {
    grass: "#78c850",
    ground: "#E2BF65",
    dragon: "#6F35FC",
    fire: "#F58271",
    electric: "#F7D02C",
    fairy: "#D685AD",
    poison: "#966DA3",
    bug: "#B3F594",
    water: "#6390F0",
    normal: "#D9D5D8",
    psychic: "#F95587",
    flying: "#A98FF3",
    fighting: "#C25956",
    rock: "#B6A136",
    ghost: "#735797",
    ice: "#96D9D6",
  };

  export const pokemonTypeFrench: {[name: string]: string} = {
    grass: "Plante",
    ground: "Sol",
    dragon: "Dragon",
    fire: "Feu",
    electric: "Electrik",
    fairy: "Fée",
    poison: "Poison",
    bug: "Insecte",
    water: "Eau",
    normal: "Normal",
    psychic: "Psy",
    flying: "Vol",
    fighting: "Combat",
    rock: "Roche",
    ghost: "Spectre",
    ice: "Glace",
  };