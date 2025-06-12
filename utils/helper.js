import jwt from "jsonwebtoken";

export const generateTokens = (userId, role) => {
  const accessToken = jwt.sign(
    { userId, role }, // I included
    process.env.JWT_ACCESS_TOKEN,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m",
    }
  );

  const refreshToken = jwt.sign(
    { userId, role },
    process.env.JWT_REFRESH_TOKEN,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
    }
  );

  return { accessToken, refreshToken };
};
