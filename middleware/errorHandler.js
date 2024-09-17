exports.errorHandler = (fn) => {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)) // Resolve to ensure `fn` can be async or return a promise
        .catch((err) => {
          if (!res.headersSent) { // Prevent sending headers if already sent
            res.status(500).json({
              message: "Internal server error",
              error: err.message || err
            });
          } else {
            next(err); // Pass the error if headers are already sent
          }
        });
    };
  };
  