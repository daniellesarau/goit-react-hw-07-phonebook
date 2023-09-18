import { nanoid } from 'nanoid';
import React from 'react';
import css from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from '../../redux/selectors';
import { filter } from '../../redux/contactsSlice';

export const Filter = () => {
  const filterID = nanoid();
  const dispatch = useDispatch();
  const currentFilter = useSelector(getFilter);
  return (
    <div className={css.container}>
      <label className={css.label} htmlFor={filterID}>
        Find contact by name
        <input
          className={css.input}
          type="text"
          name="filter"
          onChange={e => dispatch(filter(e.currentTarget.value.trim()))}
          value={currentFilter}
          id={filterID}
        />
      </label>
    </div>
  );
};
