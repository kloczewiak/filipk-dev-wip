export const useLockBodyScroll = () => (locked: boolean) => {
  if (!locked) {
    document.documentElement.style.removeProperty("--scrollbar-width");
    document.body.classList.remove("overflow-hidden");
    return;
  }

  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  document.documentElement.style.setProperty(
    "--scrollbar-width",
    `${scrollBarWidth}px`,
  );
  document.body.classList.add("overflow-hidden");
};
