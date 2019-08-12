import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  TextField,
  Button,
} from '@material-ui/core';
import { AppContainer, Panel } from './styles';
import ContactForm from './ContactForm';

export default function Contacts() {
  const user = useSelector(state => state.user.data);
  const [openForm, setOpenForm] = useState(false);

  function handleFormClose() {
    setOpenForm(false);
  }
  return (
    <AppContainer maxWidth="sm">
      <Panel>
        <Typography variant="h5" align="center">
          Seus contatos
        </Typography>
        <Grid container justify="center" spacing={2} alignItems="center">
          <Grid item xs={12}>
            {user.contacts.map(contact => (
              <Typography key={contact.id}>{contact.name}</Typography>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2} alignItems="center">
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
      <ContactForm open={openForm} handleClose={handleFormClose} />
    </AppContainer>
  );
}
