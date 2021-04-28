const { createContext, useReducer, useContext } = require("react");

const initialState = {
  heros: [],
  selected_hero: {},
};

export const FETCH_HEROS = "FETCH_HEROS";
export const SELECT_HERO = "SELECT_HERO";

const HeroContext = createContext();

const reducer = (state, { type, payload }) => {
  switch (type) {
    case FETCH_HEROS:
      return { ...state, heros: payload };
    case SELECT_HERO:
      console.log(
        "**********",
        type,
        payload,
        state.heros.find((hero) => hero.id === payload)
      );
      return (state = {
        ...state,
        selected_hero: state.heros.find((hero) => hero.id === payload),
      });
    default:
      return state;
  }
};

export const HeroProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <HeroContext.Provider value={{ state, dispatch }}>
      {children}
    </HeroContext.Provider>
  );
};

export const useHero = () => useContext(HeroContext);
