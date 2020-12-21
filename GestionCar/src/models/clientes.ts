export interface Clientes{
    id?:string; //? decir que el campo no es requerido
    nombres:string;
    direccion?:string;
    telefono?:string;
    email?:string;
    observaciones?:string;
    adeuda?:any;
    fechaCobro?:any;
    abonoCobrar?:any;
    modalidadC?:any;
    numeroVentas?:any;
    numeroPagos?:any;
    totalVendido?:any;
    totalCobrado?:any;
    orden?:number;
}