// Intro animations wait for the preloader on a full page load only;
// client-side navigations start immediately.
let booted = false;

export const markBooted = () => {
  booted = true;
};

export const introDelay = () => (booted ? 0 : 1.1);
