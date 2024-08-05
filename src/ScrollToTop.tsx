import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props: any) => {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ behavior: 'smooth', top: 0, left: 0 })
    }
  }, [location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
