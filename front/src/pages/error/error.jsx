import { useNavigate, useLocation } from "react-router-dom";
import LoadingDot from "../../components/Loading/Dot/Loading_Dot";
import { useEffect } from "react";

function Error() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/");
      window.scrollTo(0, 0);
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [location.pathname, navigate]);


  return (
    <main id="main_error">
      <p>404 error</p>
      <p>La page demander n&apos;est pas disponible</p>
      <LoadingDot />
    </main>
  );
}

export default Error;
