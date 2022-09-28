import "./App.css";
import { useEffect } from "react";

import logo from "./statics/logo.svg";
import { Col } from "antd";
import Searcher from "./components/Searcher";
import PokemonList from "./components/PokemonList";

import { getPokemons } from "./api";

import { connect } from "react-redux";

import { setPokemons as setPokemonsActions } from "./actions/index";

function App({ pokemons, setPokemons }) {
  useEffect(() => {
    const fetchPokemons = async () => {
      setPokemons(await getPokemons());
    };
    fetchPokemons();
  }, []);

  return (
    <div className="App">
      <Col span={4} offset={10}>
        <img src={logo} alt="Pokedux" />
      </Col>
      <Col span={8} offset={8}>
        <Searcher />
      </Col>
      <PokemonList pokemons={pokemons} />
    </div>
  );
}

// Los nombres son por convención

/* mapStateToProps es una función que va a recibir
  nuestro estado y va a retornar un objeto cuyas propiedades
  van a ser enviadas a los props del componente que se está
  conectando a Redux.
*/
const mapStateToProps = (state) => ({
  pokemons: state.pokemons,
});
/* Es una función que recibe el dispatcher de Redux y 
  va a retornar también un objeto que será mapeado
  de nuestras propiedades pero ahora con los actions creators
  que se habían establecido */
const mapDispatchToProps = (dispatch) => ({
  setPokemons: (value) => dispatch(setPokemonsActions(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
