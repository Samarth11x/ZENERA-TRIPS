/**
 * A wrapper to catch errors in async routes and pass them to the express error handler.
 * @param {Function} requestHandler - The async function to wrap.
 */
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    };
};

module.exports = asyncHandler;
