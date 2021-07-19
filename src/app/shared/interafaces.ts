export interface IUser {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface IFirebaseAuthResponse {
  idToken: string;
  expiresIn: string;
}
