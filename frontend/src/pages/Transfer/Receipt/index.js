import React, { useState } from 'react';
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

export default function Receipt({ open, handleClose, destination }) {
  const transfer = useSelector(state => state.transfers.data);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Recibo</DialogTitle>
      <DialogContent>
        <DialogContentText>Informações sobre a transferência</DialogContentText>
        <Paper elevation={4}>
          <DialogContentText>Comprovante de transferência</DialogContentText>
          <DialogContentText>Valor: R$ {transfer.amount}</DialogContentText>
          <DialogContentText>Para: {destination}</DialogContentText>
          <DialogContentText>Data: {transfer.created_at}</DialogContentText>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
