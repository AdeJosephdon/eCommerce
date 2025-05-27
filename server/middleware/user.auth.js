import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized. Login again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      // console.log(tokenDecode);
      // res.json({ success: true, message: tokenDecode });
      // console.log(req);
      // req.body.userId = tokenDecode.id;

      // console.log(req);
      req.user = { id: tokenDecode.id };
      // req.user = { id: tokenDecode.id };

      // console.log(tokenDecode);
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Login again",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `userAuth error: ${error.message}`,
    });
  }
};

export default userAuth;
