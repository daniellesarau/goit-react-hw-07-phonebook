import React from 'react';

import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from '../../redux/selectors';
import { removeContact } from '../../redux/contactsSlice';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const currentFilter = useSelector(getFilter);
  const visibleContacts = contacts.filter(el =>
    el.name.toLowerCase().includes(currentFilter.toLowerCase())
  );
  return (
    <div className={css.container}>
      <ul className={css.contacts_list}>
        {visibleContacts.map(({ name, id, number }) => {
          return (
            <li className={css.contact_item} key={id}>
              <p className={css.value}>
                {name}: {number}
              </p>
              <button
                className={css.button_delete}
                type="button"
                onClick={() => {
                  dispatch(removeContact(id));
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
