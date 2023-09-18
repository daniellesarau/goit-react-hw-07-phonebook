import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

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
    dispatch(addContact({ name, number }));
    reset();
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
