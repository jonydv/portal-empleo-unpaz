export interface JwtPayload {
    uid: string;
    iat: number;
    exp: number;
}