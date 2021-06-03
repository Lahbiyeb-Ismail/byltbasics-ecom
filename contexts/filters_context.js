import React, { useContext, createContext, useReducer, useEffect } from 'react';

import FiltersReducer from '../reducers/filters_reducer';
import {
  UPDATE_SORT,
  UPDATE_GENDER,
  GET_PRODUCTS_BY_GENDER,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../utils/actions';
import { getLocalStorage, setLocalStorage } from '../utils/helpers';
import { useProductsContext } from './products_context';

const FiltersContext = createContext();

const initialState = {
  gender: getLocalStorage('gender'),
  products_by_gender: [],
  filtered_products: [],
  sort: 'sort by',
  filters: {
    collections: 'all',
    style: 'all',
    cut: 'all',
    neck: 'all',
    sleeve: 'all',
    fabric: 'all',
  },
};

export const FiltersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FiltersReducer, initialState);
  const { men_products, women_products } = useProductsContext();

  const updateGender = gender => {
    dispatch({ type: UPDATE_GENDER, payload: gender });
  };

  useEffect(() => {
    dispatch({
      type: GET_PRODUCTS_BY_GENDER,
      payload: { men_products, women_products },
    });

    setLocalStorage('gender', state.gender);
  }, [state.gender]);

  useEffect(() => {
    setLocalStorage('productsByGender', state.products_by_gender);
  }, [state.gender, state.products_by_gender]);

  const updateSort = e => {
    const { value } = e.target;

    dispatch({ type: UPDATE_SORT, payload: value });
  };

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
  }, [state.sort]);

  const updateFilters = (type, value) => {
    dispatch({ type: UPDATE_FILTERS, payload: { type, value } });
  };

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
  }, [state.filters]);

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FiltersContext.Provider
      value={{
        ...state,
        updateGender,
        updateSort,
        updateFilters,
        clearFilters,
      }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => {
  return useContext(FiltersContext);
};
