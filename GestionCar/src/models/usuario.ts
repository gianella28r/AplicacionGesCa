export interface Usuario{
    uid: string;
    nombres:string;
    email:string;
    emailVerificado:any;
    password: string;
    contadorClientes?:any;
    contadorVentas?:any;
    contadorCobros?:any;
    totalVendido?:any;
    totalCobrado?:any;   
}
