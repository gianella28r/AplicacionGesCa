import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Ventas } from '../../models/ventas';
import { Productos } from '../../models/productos';
import { VentasProvider } from '../../providers/ventas/ventas';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { AuthProvider } from '../../providers/auth/auth';
import { ProductosProvider } from '../../providers/productos/productos';
import { Clientes } from '../../models/clientes';
import { DashboardProvider } from '../../providers/dashboard/dashboard';
import { Dashboard } from '../../models/dashboard';
/**
 * Generated class for the VentaContadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-venta-contado',
  templateUrl: 'venta-contado.html',
})
export class VentaContadoPage implements OnInit  {
  //idCliente:any;//variable para Recuperar el valor enviado de la otra pagina
  idCliente:any;
  i:number;
  ventass:Ventas[];
  productos:Productos[];
  idTransaccionAnterior: any;
  productosF:Productos[];
  idTran:any;

  venta: Ventas = {  
   id:'',
   titulo:'',
   nombreProducto:'',
   fechaCompra:'',
   saldoActual:'',
   precio:'',
   anticipo:'',
   total:0,
   cantidadPagos:'',
   fechaPP:'dd/mm/aaaa', //fecha proximo pago 
   observaciones:'',
   pago:'',
   clienId:'',
   cantidad:1,
   subTotal:'',
   fechaPago:'',
   saldoFavor:0,
   estadoTransaccion:true,
  } 
  ventas: Ventas = {  
   id:'',
   titulo:'',
   nombreProducto:'',
   fechaCompra:'',
   saldoActual:'',
   precio:'',
   anticipo:'',
   total:'',
   cantidadPagos:'',
   fechaPP:'', //fecha proximo pago 
   observaciones:'',
   pago:'',
   clienId:'',
   cantidad:1,
   subTotal:'',
   fechaPago:'',
   saldoFavor:0,
   estadoTransaccion:true,
  }

 itemSelected:Productos={
   id:'',
   nombre:'',
   precioVenta:'',
 }
 verSeleccion:Productos={
   id:'',
   nombre:'',
   precioVenta:'',
 }
  to:any;
  tot:any;
  total:any;
  precioReal: any;
  cantidad: number=1;
  p: any;
  subTotal:any;

  dashboard:Dashboard ={
    uid:'',
    contadorClientes:0,
    contadorNotas:0,
    contadorProductos:0,
    contadorVentas:0,
    contadorCobros:0,
    totalVendido:'0',
    totalCobrado:'0',
  };
  numeroVentas:number;
  numeroCobros:number;
  sumaVentas:any='';
  sumaCobrado:any='';
  totalVentas:any='';
  totalCobrado:any='';
  ventaS: any;

  cliente: Clientes = {  
    id:'',
    nombres:'',
    direccion: '',
    telefono:'',
    email:'',
    observaciones:'',
    adeuda:0,
    fechaCobro:'',
    abonoCobrar:'',
    numeroPagos:'',
    modalidadC:'',
    numeroVentas:'',
    totalVendido:'',
    totalCobrado:'',
    saldoFavorC:0,
    estadoCliente:true,
  } 
  numeroPa: any;
  numeroVen: any;
  totalVen: any;
  totalCo: any;
  fecha: string;
  captureDataUrl:any;
  numeroproductos: any;
  productoss: Productos = {  
    id:'',
    nombre:'',
    precioVenta:'',
    descripcion:'',
    image:'',
    idImagen:'',
    precioTransformado:'',
  } 
  estadoCantidadProductos:boolean=false;
  nombreProducto: string;
  saldoFavor: any='0';
  totalSaldoFavor: any;
  valorAfavor: any='0';
  saldoAfavor: any='0';
  valorFavor: any='0';
  constructor( public navCtrl: NavController, private authf: AuthProvider ,public navParams: NavParams, 
  private clientef:ClientesProvider,private ventaf: VentasProvider,public dashboardf: DashboardProvider, private productof:ProductosProvider) {
    this.idCliente = navParams.get("id");
    console.log("idVentas");
    console.log(this.idCliente);
    this.captureDataUrl= "assets/imgs/nimg.jpg";
  }

  ngOnInit(){
    this.anteriorVenta();
    this.goToObtenerProductos();
    this.obtenerDatosCliente();
    this.detalleUsuario();
    this.getFechaActual();
  }

  //funcion para obtener fecha actual
  getFechaActual() {
    let mes:any;
    let dia:any;
    let anio:any;
    let fechaActual:any;
    fechaActual=new Date();
    anio=fechaActual.getFullYear();
    mes=parseInt(fechaActual.getMonth())+ 1 ;
    dia=fechaActual.getDate();
   // this.fe=Date.parse(this.fecha);
    if (mes < 10) { 
     mes = "0" + mes
    } 
    if (dia < 10) { 
        dia  = "0" + dia  
    }
    this.fecha=anio+"-"+mes+"-"+dia;
    console.log('fechaActual'+this.fecha);
  }

  //funcion para recuperar datos del cliente
  obtenerDatosCliente(){
    this.clientef.getOneCliente(this.idCliente).subscribe(cliente=>{
      this.cliente=cliente;
      if(cliente!=null){
        this.numeroPa=cliente.numeroPagos;
        this.numeroVen=cliente.numeroVentas;
        this.totalVen=cliente.totalVendido;
        this.totalCo=cliente.totalCobrado;
        console.log(this.totalCo+'total');
        this.numeroproductos=this.dashboard.contadorProductos;
      }
    });
  }
  
  //funcion para obtener datos del Usuario
  detalleUsuario(){
    this.dashboardf.getDatosDashboard().subscribe(dashboard=>{
      this.dashboard=dashboard;
      this.numeroVentas=this.dashboard.contadorVentas;
      this.numeroCobros=this.dashboard.contadorCobros;
      this.sumaVentas=this.dashboard.totalVendido;
      this.sumaCobrado=this.dashboard.totalCobrado;
      console.log(this.numeroVentas+'this.passwordA');
    });
  }

  //funcion para obtener el saldo de la anterior venta
   anteriorVenta(){
    this.ventaf.getAnteriorVenta(this.idCliente).subscribe(ventass=>{
      this.ventass=ventass;
      console.log(this.ventass) ;
      console.log("1");
        for(var i=0;i<ventass.length; i++){
          this.venta=this.ventass[i];
          this.saldoFavor=this.venta.saldoFavor;
          this.saldoAfavor=this.venta.saldoFavor;
          this.valorFavor=this.saldoAfavor;
       }  
    }); 
  }

  //funcion para recuperar todos los productos guardados por el usuario
  goToObtenerProductos(){
    this.productof.getAllProductos().subscribe(productos=>{
      this.productos=productos;
    }); 
  }

  //funcion para obtener el producto y su precio 
  capturarItem(){
    this.verSeleccion=this.itemSelected;
    this.calcularPrecio(this.verSeleccion.precioVenta);
  }

  //funcion para obtener el campo precio y hacer calculos
  calcularPrecio(valor1: any) { 
    let res2:any;
    let saldoFavor:number=0;
    let verificacion:number=0;
    let strExSaldo:string='';
    console.log(valor1+'pruebaproducto');
    this.transformarPrecio(valor1);
    if(this.cantidad==null){
      this.cantidad=1;
    }  
    if(valor1){
      valor1 = parseFloat(valor1); 
      this.p=valor1;
      console.log(this.p+'p');
      if( isNaN(this.p)) {
        this.subTotal='';
        this.valorFavor=this.saldoAfavor;
      }
      let strEx:string='';
      strEx = valor1;
    //primer paso: fuera comas
      var re= /,/gi;
      if(strEx && strEx.length>3){
        strEx = strEx.replace(re,"");
      }
      this.to=parseFloat(strEx);
      strExSaldo = this.saldoAfavor;
      var reSaldoFavor= /,/gi;
    //primer paso: fuera puntoss
      if(strExSaldo && strExSaldo.length>4){
        strExSaldo = strExSaldo.replace(reSaldoFavor,""); 
      }
      this.valorAfavor=parseFloat(strExSaldo);
      saldoFavor=this.valorAfavor;
      if(saldoFavor>0 ){
        this.subTotal=this.p*this.cantidad-saldoFavor;
        let valorTotal:any;
        valorTotal=this.subTotal;
        if(valorTotal<0 || valorTotal<0.00){
          let saldoAfavor:number=0;
           saldoAfavor=valorTotal*(-1);
           console.log(saldoAfavor+'saldoAfavor');
           this.saldoFavor=saldoAfavor;
           this.subTotal=0;
         }else{
           this.saldoFavor=0;
         }
      }else{
        this.subTotal=this.p*this.cantidad;
      }
      this.ventaS=this.subTotal;
      res2=this.subTotal.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.subTotal=res2+'';
    }else{
      this.subTotal='';
      this.saldoFavor=this.valorFavor;
    }
  }

  //funcion que recibe el valor cantidad
  calcularCantidad(valor1:any){
    let st:any='';
    st = valor1;
    if(st && st.length>1){
      st = st.replace(".","");
      console.log(st+'number1');
    }
    this.cantidad=st;
    console.log(this.cantidad+'number2');
    this.calcularCantida(this.cantidad);
  }

  //funcion para obtener el campo cantidad y hacer calculos
  calcularCantida(valor1:any){
    this.cantidad=valor1;
    let saldoFavor:number=0;
    let verificacion:number=0;
    let strExSaldo:string='';
    let res2 :any;
    if(this.p==null){
      this.p=0;
    }
    if(valor1 ){
      if( isNaN( this.cantidad)) {
        this.subTotal='';
        this.valorFavor=this.saldoAfavor;
        console.log(this.total+'toalcantida');
      }
      this.saldoFavor=this.valorFavor;

      strExSaldo = this.saldoAfavor;
      var reSaldoFavor= /,/gi;
    //primer paso: fuera puntoss
      if(strExSaldo && strExSaldo.length>4){
        strExSaldo = strExSaldo.replace(reSaldoFavor,""); 
      }
      this.valorAfavor=parseFloat(strExSaldo);
      saldoFavor=this.valorAfavor;
      if(saldoFavor>0 ){
        this.subTotal=this.p*this.cantidad-saldoFavor;
        let valorTotal:any;
        valorTotal=this.subTotal;
        if(valorTotal<0 || valorTotal<0.00){
          let saldoAfavor:number=0;
           saldoAfavor=valorTotal*(-1);
           console.log(saldoAfavor+'saldoAfavor');
           this.saldoFavor=saldoAfavor;
           this.subTotal=0;
         }else{
           this.saldoFavor=0;
         }
      }else{
        this.subTotal=this.p*this.cantidad;
      }
      this.ventaS=this.subTotal;
      res2=this.subTotal.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.subTotal=res2+'';  
    }else{
      this.subTotal='';
      this.saldoFavor=this.valorFavor;
    }
  }

  //funcion para dar formato a precio
  transformarPrecio(valor1: any) { 
    this.precioReal=valor1;
    console.log(valor1+'valor1');
    let strEx;
    let res:any;
    strEx = parseFloat(this.precioReal);
    res= strEx.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    this.precioReal=res+'';
    console.log(this.precioReal+'ooo');
  }

  //funcion para sumar el total de ventas y cobros datos pafra el dashboard
  sumarVentas(){
    let res2:any;
    let res1:any;
    let tVentas:any;
    let tCobros:any;
    let ventas:any;
    let cobros:any;
    tVentas=this.sumaVentas;
    tCobros=this.sumaCobrado;
    
     ventas=this.ventaS;
     console.log(this.ventaS+'ventas2');
     console.log(ventas+'ventas');
  
      let strEx:string='';
      strEx = tVentas;
    //primer paso: fuera comas
      var re= /,/gi;
      if(strEx && strEx.length>3){
        strEx = strEx.replace(re,"");
      }
      let tot=parseFloat(strEx);
      let totalV=tot+ventas;
      res1=totalV.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.sumaVentas=res1+'';
    //suma de cobros
      let strE:string='';
      strE= tCobros;
    //primer paso: fuera comas
      var re= /,/gi;
      if(strE && strE.length>3){
        strE = strE.replace(re,"");
      }
      let totC=parseFloat(strE);
      let totalC=totC+ventas;
      res2=totalC.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.sumaCobrado=res2+'';
  }

  //funcion para sumar el total de ventas y cobros datos para el cliente
  sumarVentasCliente(){
    let res2:any;
    let res1:any;
    let tVentas:any;
    let tCobros:any;
    let ventas:any;
    if(!this.totalVen){
      this.totalVen=0;
    }
    if(!this.totalCo){
      this.totalCo=0;
    }
    tVentas=this.totalVen;
    tCobros=this.totalCo;
    
     ventas=this.ventaS;
     console.log(this.ventaS+'ventas2');
     console.log(ventas+'ventas');
  
      let strEx:string='';
      strEx = tVentas;
    //primer paso: fuera comas
      var re= /,/gi;
      if(strEx && strEx.length>3){
        strEx = strEx.replace(re,"");
      }
      let tot=parseFloat(strEx);
      let totalV=tot+ventas;
      res1=totalV.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.totalVen=res1+'';
    //suma de cobros
      let strE:string='';
      strE= tCobros;
    //primer paso: fuera comas
      var re= /,/gi;
      if(strE && strE.length>3){
        strE = strE.replace(re,"");
      }
      let totC=parseFloat(strE);
      let totalC=totC+ventas;
      res2=totalC.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.totalCo=res2+'';
  }

  //funcion para obtener un producto
  goToObtenerUnProducto(){
    var producto:any;
    var nombreoriginal:any;
    this.nombreProducto=this.verSeleccion.nombre;
    var numero :number =0;
    this.productof.getOneProductos(this.nombreProducto).subscribe(productos=>{
     this.productosF=productos;
     if(productos.length){
         this.estadoCantidadProductos=true;
         console.log('si hay este producto'+productos.length);  
        
     }
     console.log('si hay este producto nombre es'+this.nombreProducto);  
     this.crearproducto(this.estadoCantidadProductos,this.nombreProducto);
   });
   
 }

 //crear un producto que no existe
 crearproducto(estado:any,nombreoriginal:any){
   
   console.log('entradndo  a'+this.nombreProducto);
   console.log('esaddo creacion'+this.nombreProducto);
   this.estadoCantidadProductos=estado;
   this.nombreProducto=nombreoriginal;

   if(this.estadoCantidadProductos==false ){
     this.productof.addNewProductoVentas(this.nombreProducto,this.precioReal,this.captureDataUrl);
     this.numeroproductos=this.numeroproductos+1;
     console.log(this.numeroproductos+'numero de Productos');
   }else{
     console.log(' no se guardado producto');
   }
 }

  //funcion para crear una venta al contado nueva
  goToCrearVentaContado({value}:{value:Ventas}){
    this.goToObtenerUnProducto();
    this.sumarVentas();
    this.sumarVentasCliente();
    value.titulo="Venta Contado";
    value.fechaCompra=(new Date()).getTime();
    value.precio=this.precioReal;
    value.cantidad=this.cantidad;
    value.fechaPago=this.fecha;
    value.saldoFavor=this.saldoFavor;
    value.estadoTransaccion=true;
    this.numeroVentas=this.numeroVentas+1;
    this.numeroCobros=this.numeroCobros+1;
    this.numeroPa=this.numeroPa+1;
    this.numeroVen=this.numeroVen+1;
    this.nombreProducto=this.verSeleccion.nombre;

    this.authf.getAuth().subscribe(user=>{
      this.dashboardf.updateUsuarioTotalVentas(this.numeroproductos,this.numeroVentas,this.numeroCobros,this.sumaVentas,this.sumaCobrado);
      this.clientef.updateClienteDatosVenta(this.idCliente,this.numeroPa,this.numeroVen,this.totalVen,this.totalCo,this.saldoFavor); 
      this.ventaf.addNewVenta(value,this.idCliente);
    });
    console.log(this.idCliente);
    this.navCtrl.pop();
  }

  /*//funcion para obtener el saldo actual 
  obtenerSaldoActual(){
    this.ventaf.getAnteriorVenta(this.idCliente).subscribe(ventass=>{
      this.ventass=ventass;
      console.log(this.ventass) ;
      console.log("1");
      for(var i=0;i<ventass.length; i++){
        this.venta=this.ventass[i];
        this.clientef.updateClienteDatosVenta(this.idCliente,this.venta.total,this.numeroPa,this.numeroVen,this.totalVen,this.totalCo); 
     }
    });
  }*/

 

}
