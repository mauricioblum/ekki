import React from 'react';
import PropTypes from 'prop-types';
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
import moment from 'moment';

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
          <DialogContentText>
            Data: {moment(transfer.created_at).format('DD/MM/YYYY HH:mm')}
          </DialogContentText>
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

Receipt.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  destination: PropTypes.string.isRequired,
};
