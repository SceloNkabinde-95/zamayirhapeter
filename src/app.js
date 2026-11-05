// Presentation enhancements only; navigation, contact links and services work without JavaScript.
const privacyDialog = document.querySelector('#privacy-dialog');
const privacyTrigger = document.querySelector('[data-open-privacy]');
privacyTrigger?.addEventListener('click', () => privacyDialog?.showModal());
document.querySelector('[data-close-privacy]')?.addEventListener('click', () => privacyDialog?.close());
privacyDialog?.addEventListener('click', (event) => {
  if (event.target !== privacyDialog) return;
  const bounds = privacyDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) privacyDialog.close();
});
privacyDialog?.addEventListener('close', () => privacyTrigger?.focus({ preventScroll: true }));
