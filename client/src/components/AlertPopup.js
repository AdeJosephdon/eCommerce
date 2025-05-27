import "./../styles/popup.css";
import { Icon } from "@iconify/react/dist/iconify.js";

function AlertPopup({ isOpen, onClose, children, type }) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div
        className={
          type === "failure"
            ? "failed-popup-content popup-content"
            : "success-popup-content popup-content"
        }
      >
        <h1 className="popup-content-heading">
          <div>Attention!!!</div>
          <button className="popup-close" onClick={onClose}>
            <Icon
              icon="material-symbols:close-rounded"
              width="35"
              height="35"
            />
          </button>
        </h1>

        {children}
      </div>
    </div>
  );
}

export default AlertPopup;
