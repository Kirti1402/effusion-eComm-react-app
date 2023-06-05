import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import "./Loaderstyle.css";

export const Loader = () => {
  return (
    <div className="loader">
      <FontAwesomeIcon icon={faSpinner} className="icon" spin />
    </div>
  );
};
