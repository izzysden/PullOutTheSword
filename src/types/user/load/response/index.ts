export interface UserLoadResponseType {
  username: string;
  tries: number;
  pulls: number;
  cooldown?: Date | string;
  tpp: number;
}
