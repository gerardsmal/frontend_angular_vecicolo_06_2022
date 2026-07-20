export interface LoginReq {
  userName: string;
  pwd: string;
}
export interface LoginDTO{
  accessToken:string,
  tokenType:string
}
export interface MeDTO{
  id:string,
	role:string,
	mailValidate:string,
  carelloSize:number
}
