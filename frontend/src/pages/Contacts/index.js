import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  TextField,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Toast from '../../components/Toast';
import { Types as UserTypes } from '../../store/ducks/user';
import { NotificationStatus } from '../../services/NotificationService';

import {
  AppContainer,
  Panel,
  ContactsContainer,
  ContactsTable,
} from './styles';
import ContactForm from './ContactForm';

export default function Contacts({ history }) {
  const user = useSelector(state => state.user);
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();
  const [openToast, setOpenToast] = useState(false);
  const [variantToast, setVariantToast] = useState('success');
  const [toastMessage, setToastMessage] = useState('');

  function handleCloseToast(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  }

  function handleFormClose() {
    setOpenForm(false);
  }

  function handleAddContact(cpf, name) {
    dispatch({ type: UserTypes.ADD_USER_CONTACT_REQUEST, cpf, name });
    setOpenForm(false);
    setOpenToast(true);
  }

  function handleRemoveContact(id) {
    dispatch({ type: UserTypes.DELETE_USER_CONTACT_REQUEST, id });
    setOpenToast(true);
  }

  return (
    <AppContainer maxWidth="sm">
      <Panel>
        <Typography variant="h5" align="center">
          Seus contatos
        </Typography>
        <Grid container justify="center" spacing={2} alignItems="center">
          <Grid item xs={12}>
            <ContactsContainer>
              <ContactsTable>
                <TableHead>
                  <TableRow>
                    <TableCell>Contato</TableCell>
                    <TableCell>CPF</TableCell>
                    <TableCell align="center">Ação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.data.contacts.map(contact => (
                    <TableRow key={contact.id}>
                      <TableCell>{contact.name}</TableCell>
                      <TableCell>{contact.cpf}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => handleRemoveContact(contact.id)}>
                          Remover
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </ContactsTable>
            </ContactsContainer>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2} alignItems="center">
              <Button color="primary" onClick={() => history.goBack()}>
                Voltar
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={() => setOpenForm(true)}
              >
                Adicionar contato
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Panel>
      <ContactForm
        open={openForm}
        handleClose={handleFormClose}
        handleAdd={handleAddContact}
      />
      <Toast
        open={openToast}
        handleClose={handleCloseToast}
        variant={NotificationStatus().variant}
        message={NotificationStatus().message}
      />
    </AppContainer>
  );
}
