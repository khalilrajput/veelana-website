import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly jump to top on navigation - eliminate crawling/scrolling lag
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    // Extra safety for all scrolling containers
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
