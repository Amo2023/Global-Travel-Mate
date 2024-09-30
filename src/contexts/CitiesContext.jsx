import { createContext, useContext, useEffect, useReducer } from "react";

const citiesContext = createContext();
const BASE_URL = `http://localhost:9000`;

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "loading":
      return { ...state, isLoading: true };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    fetchCities();
  }, []);

  async function fetchCities() {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      dispatch({ type: "cities/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "An error happened when loading cities..",
      });
    }
  }

  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "An error happened when loading cities..",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      fetchCities();
      // dispatch({ type: "city/created", payload: newCity });
    } catch {
      dispatch({
        type: "rejected",
        payload: "An error happened when creating city..",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      fetchCities();
      // dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "An error happened when deleting city..",
      });
    }
  }

  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(citiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };


// note:
// const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
//   reducer,
//   initialState
// );
// const [cities, setCities] = useState([]);
// const [currentCity, setCurrentCity] = useState({});
// const [isLoading, setIsLoading] = useState(false);
