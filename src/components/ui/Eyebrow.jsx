const Eyebrow = ({ children, light }) => (
  <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.18em] ${light ? 'text-[#19C3C7]' : 'text-[#2F6BFF]'}`}>{children}</p>
);

export default Eyebrow;
