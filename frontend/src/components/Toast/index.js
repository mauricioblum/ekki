import React from 'react';

import { Snackbar, SnackbarContent, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function Toast({
  open,
  handleClose,
  variant,
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
      <SnackbarContent
        variant={variant}
        message={message}
        action={[
          withButton && (
            <Button
              key="undo"
              color="secondary"
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
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}
