import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home_redir() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/");
        window.scrollTo(0, 0);
    })
    return <></>;
}

export default Home_redir;