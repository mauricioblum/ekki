import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Grid, Button } from '@material-ui/core';
import moment from 'moment';
import MUIDataTable from 'mui-datatables';
import { Types as ExtractTypes } from '../../store/ducks/extract';

import { AppContainer, Panel } from './styles';

export default function Extract({ history }) {
  const extracts = useSelector(state => state.extracts);
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();

  const tableColumns = [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: false,
      },
    },
    {
      name: 'amount',
      label: 'Valor',
      options: {
        filter: false,
        customBodyRender: value => `R$ ${value}`,
      },
    },
    {
      name: 'created_at',
      label: 'Data',
      options: {
        filter: false,
        customBodyRender: value => moment(value).format('DD/MM/YYYY HH:mm'),
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        customBodyRender: value => {
          switch (value) {
            case 'COMPLETED':
              return 'CONCLUÍDA';
            case 'CANCELLED':
              return 'CANCELADA';
            case 'REJECTED':
              return 'RECUSADA';
            case 'IN_PROGRESS':
              return 'EM ANDAMENTO';
            default:
              return 'IN_PROGRESS';
          }
        },
      },
    },
  ];

  const tableOptions = {
    filterType: 'checkbox',
    print: false,
    download: false,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10],
    selectableRows: 'none',
    responsive: 'stacked',
    textLabels: {
      body: {
        noMatch: 'Você ainda não tem transferências',
        toolTip: 'Ordenar',
      },
      pagination: {
        next: 'Próxima',
        previous: 'Anterior',
        rowsPerPage: 'Linhas por página',
        displayRows: 'de',
      },
      toolbar: {
        search: 'Pesquisar',
        viewColumns: 'Ver Colunas',
        filterTable: 'Filtrar',
      },
      filter: {
        all: 'Todos',
        title: 'FILTROS',
        reset: 'RESETAR',
      },
      viewColumns: {
        title: 'Ver Colunas',
        titleAria: 'Mostrar/Esconder TColunas',
      },
    },
  };

  useEffect(() => {
    dispatch({ type: ExtractTypes.EXTRACT_REQUEST, userId: user.id });
  }, [dispatch, user.id]);
  return (
    <AppContainer maxWidth="sm">
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Panel>
            <Typography variant="h5">Transferências</Typography>
            <Grid item>
              <MUIDataTable
                title="Extrato"
                data={extracts.data}
                columns={tableColumns}
                options={tableOptions}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.goBack()}
              >
                Voltar
              </Button>
            </Grid>
          </Panel>
        </Grid>
      </Grid>
    </AppContainer>
  );
}

Extract.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};
