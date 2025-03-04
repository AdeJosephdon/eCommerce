import { Link } from "react-router-dom";
import PageStructure from "./PageStructure";


function NotFoundPage() {


  return (

    <PageStructure>
      <main className="not-found-container">
        <div className="route"><span>Home / </span>404 Error</div>


        <div className="error-container"> 
        <p className="error-text">404 Not Found </p>
        <div>Your visited page not found. You may go home page. </div>

        <button>
            <Link to="/">Back to home page </Link>
        </button>

        </div>

      </main>
    </PageStructure>



  );
}

export default NotFoundPage;