const authenticate = (ctx) => {
  const { req, res } = ctx;
  if (req) {
    // server-side
    const isAuthenticated = checkServerAuth(req); // checkServerAuth is a function that checks if the user is authenticated on the server
    if (!isAuthenticated) {
      res.writeHead(302, { Location: "/login" });
      res.end();
    }
  } else {
    // client-side
    const isAuthenticated = checkClientAuth(); // checkClientAuth is a function that checks if the user is authenticated on the client
    if (!isAuthenticated) {
      Router.push("/login");
    }
  }
};

export default authenticate;
