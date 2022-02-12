import jsonwebtoken from "jsonwebtoken";

// --- Authentification Middleware ---
// Check if the user have a correct jwt token
// Also set a locals var "user_id" with the user mongodb _id
const checkAuthToken = (req, res, next) => {
  // Check if jwt cookie
  const token = req.cookies.jwt;
  if (!token) {
    res.locals.user_id = null;
    return res.status(401).send("Access Denied: No Token");
  }

  // JWT verify token
  try {
    const jwtCheck = jsonwebtoken.verify(token, process.env.JWT_KEY);
    res.locals.user_id = jwtCheck.user_id;
    next();
  } catch (error) {
    res.locals.user_id = null;
    res.cookie("jwt", "", { maxAge: 1 }); // "Delete" the jwt cookie
    return res.status(401).send("Acces Denied: Invalid Token");
  }
};

export default checkAuthToken;
