import React, { useEffect } from 'react';

import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  getIsLoading,
  getError,
  getFilteredContacts,
} from '../../redux/selectors';
import { deleteContact, fetchContact } from 'redux/operations';

export const ContactList = () => {
  const contacts = useSelector(getFilteredContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };
  return (
    <div className={css.container}>
      {isLoading}
      {!contacts?.length && !error && !isLoading && <p>No contacts found.</p>}

      {error && <p>{error}</p>}
      <ul className={css.contacts_list}>
        {contacts.map(({ name, id, number }) => (
          <li className={css.contact_item} key={id}>
            <p className={css.value}>
              {name}: {number}
            </p>
            <button
              className={css.button_delete}
              type="button"
              onClick={() => handleDeleteContact(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
