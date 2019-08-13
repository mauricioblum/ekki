let variant = '';
let message = '';

function getVariant() {
  return variant;
}

function getMessage() {
  return message;
}

function setVariant(v) {
  variant = v;
}

function setMessage(m) {
  message = m;
}

function NotificationStatus() {
  return { variant: getVariant(), message: getMessage() };
}

function showSuccessToast(m) {
  setVariant('success');
  setMessage(m);
  return { variant, message };
}

function showErrorToast(m) {
  setVariant('error');
  setMessage(m);
  return { variant, message };
}

export { NotificationStatus, showSuccessToast, showErrorToast };
