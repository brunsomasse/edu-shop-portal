import { useState, useEffect } from 'react';

const useScrolled = (px = 24) => {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const f = () => setOn(window.scrollY > px);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, [px]);
  return on;
};

export default useScrolled;
