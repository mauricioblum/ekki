import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Box, Typography, Grid, Button } from '@material-ui/core';
import { AppContainer, Panel } from './styles';

export default function Wallet({ history }) {
  const user = useSelector(state => state.user.data);
  return (
    <AppContainer maxWidth="sm">
      <Grid container justify="center" spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Panel>
            <Typography align="center" variant="h5">
              Bem vindo à sua carteira, {user.name}
            </Typography>
            <Box my={4}>
              <Typography align="center" variant="h6">
                Detalhes da sua conta
              </Typography>
              <Typography>Número: {user.account.number}</Typography>
              <Typography>Saldo: R$ {user.account.balance}</Typography>
              <Typography>Limite: R$ {user.account.limit}</Typography>
            </Box>
            <Box my={4}>
              <Grid
                spacing={4}
                container
                direction={
                  useMediaQuery('(max-width:768px)') ? 'column' : 'row'
                }
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} md={4}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => history.push('/user/contacts')}
                  >
                    Contatos
                  </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => history.push('/user/extracts')}
                  >
                    Extratos
                  </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => history.push('/user/transfer')}
                  >
                    Transferir
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box my={1}>
              <Grid container justify="flex-end" alignItems="flex-end">
                <Grid item xs={12}>
                  <Button color="primary" onClick={() => history.goBack()}>
                    Sair
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Panel>
        </Grid>
      </Grid>
    </AppContainer>
  );
}

Wallet.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,
};
