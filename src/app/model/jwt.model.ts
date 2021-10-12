export interface Jwt {
  sub: string;
  username: string;
  authorties: string[];
  iat: number;
  exp: number;
}
