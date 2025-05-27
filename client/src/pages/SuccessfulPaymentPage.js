import { Link } from "react-router-dom";
import PageStructure from "../components/PageStructure";

function SuccessfulPaymentPage() {
  return (
    <PageStructure>
      <main className="not-found-container">
        <div className="route">
          <span>Home / </span>Payment Successful
        </div>

        <div className="error-container">
          <p className="error-text">Payment Successful. </p>
          <div>Your order has been successfully placed.</div>

          <button>
            <Link to="/">Find more products here. </Link>
          </button>
        </div>
      </main>
    </PageStructure>
  );
}

export default SuccessfulPaymentPage;
