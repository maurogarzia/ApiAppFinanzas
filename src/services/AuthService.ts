import jwt from "jsonwebtoken";
import { IUsers } from "@/types/IUsers";

export const generateJwtToken = (user: IUsers) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      provider: user.provider,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
};
