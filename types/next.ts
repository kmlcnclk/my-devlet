import { NextApiRequest } from "next";
import { ISignJwt } from "./Jwt";

export interface NextApiRequestWithUser extends NextApiRequest {
  user?: ISignJwt;
}
