import React from 'react';
import css from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';
import { getFilter } from 'redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <div className={css.container}>
      <label className={css.label} htmlFor="filter">
        Find contact by name
        <input
          className={css.input}
          type="text"
          name="filter"
          value={filter}
          onChange={event => dispatch(setFilter(event.target.value.trim()))}
        />
      </label>
    </div>
  );
};
