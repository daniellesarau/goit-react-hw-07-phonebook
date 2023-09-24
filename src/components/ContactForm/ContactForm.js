import React from 'react';

import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { getIsLoading } from 'redux/selectors';
import { addContact } from 'redux/operations';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);

  const handleChange = event => {
    const { name, value } = event.target;
    if ('name' === name) {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!isLoading) {
      dispatch(addContact({ name, number }));
      reset();
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const inputNameId = nanoid();
  const inputTelId = nanoid();

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label_name} htmlFor={inputNameId}>
        Name
        <input
          className={css.input}
          id={inputNameId}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-zА-Z]+(([' -][a-zA-Zа-zА-Z ])?[a-zA-Zа-zА-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Enter name"
          value={name}
        />
      </label>
      <label className={css.label_number} htmlFor={inputTelId}>
        Number
        <input
          className={css.input}
          id={inputTelId}
          onChange={handleChange}
          value={number}
          type="tel"
          name="number"
          placeholder="Enter phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};
