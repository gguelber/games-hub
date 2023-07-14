export const handleSnackbar = (
  close,
  setMessage,
  message,
  setSeverity,
  severity,
  open
) => {
  close();
  setMessage(message);
  setSeverity(severity);
  open(true);
};
