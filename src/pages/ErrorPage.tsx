import type React from "react";
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
        <Link to="/">Go Back</Link>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <p>{error.message}</p>
        <Link to="/">Go Back</Link>
      </div>
    );
  } else {
    return (
      <div>
        <p>Unknown error occurred</p>
        <Link to="/">Go Back</Link>
      </div>
    );
  }
};

export default ErrorPage;
