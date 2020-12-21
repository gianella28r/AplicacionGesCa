export interface Ventas{
   id?:string;
   titulo?:string;
   nombreProducto?:string;
   fechaCompra?:any;
   saldoActual?:any;
   precio?:any;
   anticipo?:any; 
   total?:any; 
   cantidadPagos?:any;
   fechaPP?:any; //fecha proximo pago 
   observaciones?:string;
   pago?:any;
   clienId?:string;
   cantidad?:number;
   subTotal?:any;
   fechaPago?:any;
}