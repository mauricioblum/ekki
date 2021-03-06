import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
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

LimitAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  hasBalance: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleTransfer: PropTypes.func.isRequired,
};
