import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';

import { Snackbar, SnackbarContent, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: '#4fa444',
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const {
    className,
    message,
    onClose,
    variant,
    withButton,
    handleViewReceipt,
  } = props;

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          {message}
        </span>
      }
      action={[
        withButton && (
          <Button
            key="undo"
            color="inherit"
            size="small"
            onClick={handleViewReceipt}
          >
            Ver Recibo
          </Button>
        ),
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning', ''])
    .isRequired,
  withButton: PropTypes.bool,
  handleViewReceipt: PropTypes.func,
};

MySnackbarContentWrapper.defaultProps = {
  className: '',
  message: '',
  onClose: () => {},
  withButton: false,
  handleViewReceipt: () => {},
};

export function Toast({
  open,
  handleClose,
  variantType,
  message,
  withButton,
  handleViewReceipt,
}) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <MySnackbarContentWrapper
        onClose={handleClose}
        variant={variantType}
        message={message}
        withButton={withButton}
        handleViewReceipt={handleViewReceipt}
      />
    </Snackbar>
  );
}

Toast.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  variantType: PropTypes.oneOf(['error', 'info', 'success', 'warning', ''])
    .isRequired,
  message: PropTypes.string.isRequired,
  withButton: PropTypes.bool,
  handleViewReceipt: PropTypes.func,
};

Toast.defaultProps = {
  withButton: false,
  handleViewReceipt: () => {},
};
