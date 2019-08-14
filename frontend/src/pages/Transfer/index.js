import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Grid,
  Button,
  MenuItem,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { AppContainer, Panel, ContactSelect } from './styles';
import { Toast } from '../../components/Toast';
import { Types as TrasferTypes } from '../../store/ducks/transfer';
import { NotificationStatus } from '../../services/NotificationService';
import Receipt from './Receipt';
import LimitAlert from './LimitAlert';

export default function Transfer({ history }) {
  const [selectedContact, setSelectedContact] = useState({
    name: 'default',
  });
  const [amount, setAmount] = useState(0);
  const user = useSelector(state => state.user.data);
  const error = useSelector(state => state.user.error);
  const transferError = useSelector(state => state.transfers.error);
  const dispatch = useDispatch();
  const [openToast, setOpenToast] = useState(false);
  const [openReceipt, setOpenReceipt] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [disabled, setDisabled] = useState(true);

  function handleCloseToast(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  }

  function handleChange(event) {
    setSelectedContact(event.target.value);
  }

  function handleTransfer() {
    if (user.account.balance <= 0) {
      setOpenAlert(true);
    } else {
      dispatch({
        type: TrasferTypes.TRANSFER_REQUEST,
        id: selectedContact.owner_id,
        amount,
        history,
      });
      setOpenToast(true);
      setAmount(0);
    }
  }

  function handleConfirmTransfer() {
    dispatch({
      type: TrasferTypes.TRANSFER_REQUEST,
      id: selectedContact.owner_id,
      amount,
      history,
    });
    setAmount(0);
    setOpenAlert(false);
    setOpenToast(true);
  }

  useEffect(() => {
    if (amount <= 0) {
      setAmount('');
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [amount]);

  function showReceipt() {
    setOpenReceipt(true);
  }
  function closeReceipt() {
    setOpenReceipt(false);
  }

  function closeAlert() {
    setOpenAlert(false);
  }

  return (
    <AppContainer maxWidth="sm">
      <Grid container justify="center" spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Panel>
            <Grid item>
              <Typography align="center" variant="h5">
                Nova Transferência
              </Typography>
              <Typography align="center" variant="h6">
                Saldo atual: R$ {user.account.balance}
              </Typography>
              <Typography align="center" variant="h6">
                Limite atual: R$ {user.account.limit}
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
              >
                <Typography align="center">
                  Selecione o contato/favorecido
                </Typography>
                <ContactSelect
                  variant="outlined"
                  value={selectedContact}
                  onChange={e => handleChange(e)}
                >
                  <MenuItem value={selectedContact} disabled>
                    Selecione...
                  </MenuItem>
                  {user.contacts.map(contact => (
                    <MenuItem key={contact.id} value={contact}>
                      {contact.name}
                    </MenuItem>
                  ))}
                </ContactSelect>
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                disabled={selectedContact.name === 'default'}
                id="amount"
                type="number"
                min={0}
                max={10000}
                value={amount}
                onChange={e => setAmount(e.target.value)}
                label="Valor"
                inputProps={{ step: 100 }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <Button color="primary" onClick={() => history.goBack()}>
                Voltar
              </Button>
              <Button
                disabled={disabled}
                color="primary"
                variant="contained"
                onClick={() => handleTransfer()}
              >
                Transferir
              </Button>
            </Grid>
          </Panel>
        </Grid>
        <Receipt
          open={openReceipt}
          handleClose={closeReceipt}
          destination={selectedContact.name}
        />
        <LimitAlert
          open={openAlert}
          handleClose={closeAlert}
          handleTransfer={handleConfirmTransfer}
          hasBalance={user.account.limit > 0}
        />
        <Toast
          withButton={!!error}
          open={openToast}
          handleClose={handleCloseToast}
          variantType={NotificationStatus().variant}
          message={
            transferError ? `${transferError}` : NotificationStatus().message
          }
          handleViewReceipt={showReceipt}
        />
      </Grid>
    </AppContainer>
  );
}

Transfer.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};
