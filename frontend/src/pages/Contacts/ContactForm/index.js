import React, { useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  TextField,
} from '@material-ui/core';

export default function ContactForm({ open, handleClose }) {
  const [nameInput, setNameInput] = useState('');
  const [cpfInput, setCpfInput] = useState('');

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Adicione um Contato</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Adicione um Contato que já possua cadastro no Ekki, por nome ou CPF!
        </DialogContentText>
        <TextField
          margin="dense"
          id="name"
          label="Nome"
          type="text"
          fullWidth
          autoFocus
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
        />
        <TextField
          margin="dense"
          id="cpf"
          label="CPF"
          type="number"
          fullWidth
          value={cpfInput}
          onChange={e => setCpfInput(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleClose} color="primary" variant="contained">
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
