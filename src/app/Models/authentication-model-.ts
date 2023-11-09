export interface AuthenticationModel {
    message: string;
    isAuthenticated: boolean ;
    userName: string;
    email: string;
    roles: string[];
    token: string;
}
