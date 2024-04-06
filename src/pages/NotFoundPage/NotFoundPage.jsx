import React from "react";
import "./NotFoundPage.style.css";

const NotFoundPage = () => {
  return (
    <div>
      <div className="error-img">
        <img
          src={process.env.PUBLIC_URL + "/images/404_error.png"}
          alt="404 error"
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
