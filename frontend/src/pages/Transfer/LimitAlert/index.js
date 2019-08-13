import React from 'react';

import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Paper,
} from '@material-ui/core';

export default function LimitAlert({
  hasBalance,
  open,
  handleClose,
  handleTransfer,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {hasBalance ? 'Aviso de utilização de limite' : 'Saldo Insuficiente'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {hasBalance
            ? 'Você não possui saldo suficiente para completar esta transferência, será utilizado o seu limite, deseja proceder?'
            : 'Você não possui saldo suficiente para completar esta transferência :('}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {hasBalance ? 'Cancelar' : 'Fechar'}
        </Button>
        {hasBalance && (
          <Button
            onClick={handleTransfer}
            color="primary"
            variant="contained"
            autoFocus
          >
            Transferir
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
