import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  TextField,
  FormControl,
  FormHelperText,
} from '@material-ui/core';

export default function Signup({ open, handleClose, handleAdd }) {
  const [nameInput, setNameInput] = useState('');
  const [cpfInput, setCpfInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [cpfError, setCpfError] = useState(false);
  const [nameError, setNameError] = useState(false);

  function handleUser() {
    if (cpfInput.length <= 0 || nameInput.length <= 0) {
      setCpfError(cpfInput.length <= 0);
      setNameError(nameInput.length <= 0);
      return;
    }
    setCpfInput('');
    setNameInput('');
    setPhoneInput('');
    handleAdd(cpfInput, nameInput, phoneInput);
  }

  useEffect(() => {
    if (nameInput.length > 0) {
      setNameError(false);
    }
  }, [nameInput]);

  useEffect(() => {
    if (cpfInput.length > 0) {
      setCpfError(false);
    }
  }, [cpfInput]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Cadastro</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Preencha os seus dados para abrir sua conta no Ekki!
        </DialogContentText>
        <TextField
          margin="dense"
          id="name"
          label="Nome"
          type="text"
          fullWidth
          autoFocus
          required
          error={nameError}
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
        />
        <FormHelperText id="name-helper">Digite o seu nome</FormHelperText>

        <TextField
          margin="dense"
          id="cpf"
          required
          label="CPF"
          type="number"
          fullWidth
          value={cpfInput}
          error={cpfError}
          onChange={e => setCpfInput(e.target.value)}
        />
        <FormHelperText id="cpf-helper">Digite o seu CPF</FormHelperText>
        <TextField
          margin="dense"
          id="phone"
          label="Telefone"
          type="number"
          fullWidth
          value={phoneInput}
          onChange={e => setPhoneInput(e.target.value)}
        />
        <FormHelperText id="phone-helper">Digite o seu Telefone</FormHelperText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button
          onClick={() => handleUser()}
          color="primary"
          variant="contained"
        >
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
