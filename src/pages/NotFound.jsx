function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p className="error-message">The URL you entered does not exist.</p>
      <a href="/">Go to Home</a>
    </div>
  );
}

export default NotFound;