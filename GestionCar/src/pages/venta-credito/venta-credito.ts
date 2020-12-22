import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Ventas } from '../../models/ventas';
import { Productos } from '../../models/productos';
import { VentasProvider } from '../../providers/ventas/ventas';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { ProductosProvider } from '../../providers/productos/productos';
import { AuthProvider } from '../../providers/auth/auth';
import { Clientes } from '../../models/clientes';
import { DashboardProvider } from '../../providers/dashboard/dashboard';
import { Dashboard } from '../../models/dashboard';
/**
 * Generated class for the VentaCreditoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-venta-credito',
  templateUrl: 'venta-credito.html',
})
export class VentaCreditoPage  implements OnInit{
  idCliente:any;
  i:number;
  ventass:Ventas[];
  productos:Productos[];
  productosF:Productos[];
  productosFi:Productos[];
  idTransaccionAnterior: any;
  idTran:any;
  venta: Ventas = {  
   id:'',
   titulo:'',
   nombreProducto:'',
   fechaCompra:'',
   saldoActual:0,
   precio:'',
   anticipo:'',
   total:0,
   cantidadPagos:'',
   fechaPP:'', //fecha proximo pago 
   observaciones:'',
   pago:'',
   clienId:'',
   cantidad:1,
   subTotal:'',
   fechaPago:'',
  } 

  ventas: Ventas = {  
   id:'',
   titulo:'',
   nombreProducto:'',
   fechaCompra:'',
   saldoActual:0,
   precio:'',
   anticipo:0,
   total:0,
   cantidadPagos:'',
   fechaPP:'', //fecha proximo pago 
   observaciones:'',
   pago:'',
   clienId:'',
   cantidad:1,
   subTotal:'',
   fechaPago:'',
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


  modalidadC=[
    {
      id: '1',
      titulo: 'Unico Pago'
    },
    {
      id: '2',
      titulo: 'Diario'
    },
    {
      id: '3',
      titulo: 'Semanal'
    },
    {
      id: '4',
      titulo: 'Quincenal'
    },
    {
      id: '5',
      titulo: 'Mensual'
    },
  ];

  itemS={
   id:'',
   titulo:'',
 }
  verS={
   id:'',
   titulo:'',
 }
  t:any;
  to:any;
  tot:any;
  a:number=0;
  p:any;
  f:any;
  n:number=0;
  m:any;
  mensaje:any;
  total:any='';
  precioReal: any;
  precioTrans: any=0;
  cantidad:number=1;
  subTotal:any;
  sub:any;
  totalist: any;

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
  anticipo:any=0;

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
    orden:0,
  } 
  numeroPa: any;
  numeroVen: any;
  totalVen: any;
  totalCo: any;
  fecha: string;
  nombreProducto:any;
  precioProducto:any;
  captureDataUrl:any;
  numeroproductos:any;
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
  
  
 constructor( public navCtrl: NavController, private authf: AuthProvider ,public dashboardf: DashboardProvider,public navParams: NavParams, private clientef:ClientesProvider,private ventaf: VentasProvider,private productof:ProductosProvider) {
    this.idCliente = navParams.get("id");
    this.captureDataUrl= "assets/imgs/nimg.jpg";
  }
  

  ngOnInit(){
    this.anteriorVenta();
    this.goToObtenerProductos();
    this.obtenerDatosCliente();
    this.detalleUsuarioDashboard(); 
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
      }
    });
  }

  //funcion para obtener datos del Dashboard
  detalleUsuarioDashboard(){
    this.dashboardf.getDatosDashboard().subscribe(dashboard=>{
      this.dashboard=dashboard;
      this.numeroVentas=this.dashboard.contadorVentas;
      this.numeroCobros=this.dashboard.contadorCobros;
      this.sumaVentas=this.dashboard.totalVendido;
      this.sumaCobrado=this.dashboard.totalCobrado;
      this.numeroproductos=this.dashboard.contadorProductos;
     
    });
  }

  //funcion para obtener datos de la anterior venta
  anteriorVenta(){
    this.ventaf.getAnteriorVenta(this.idCliente).subscribe(ventass=>{
      this.ventass=ventass;
     
      if(this.ventass.length==1){
        for(var i=0;i<ventass.length; i++){
          this.venta=this.ventass[i];
          this.total=this.venta.total;
          this.tot=this.total;
          this.t=this.tot;
         
       }  
      }else{
        this.total=0;
        this.tot=this.total;
        this.t=this.tot;
       
      }
    }); 
  }

  //funcion para recuperar todos los productos guardados por el usuario
  goToObtenerProductos(){
    this.productof.getAllProductos().subscribe(productos=>{
      this.productos=productos;
    }); 
  }

   //funcion para obtener un producto
   /*goToObtenerUnProducto(){
     var producto:any;
     var nombreoriginal:any;
     this.nombreProducto=this.verSeleccion.nombre;
     this.productof.getOneProductos(this.nombreProducto).subscribe(productosF=>{
      this.productosF=productosF;
      //producto=productosF.length;
      if(this.productosF.length>0){
        for(var i=0;i<productosF.length; i++){
          this.productoss=this.productosF[i];
          if(nombreoriginal==this.productoss.nombre){
            var cont=cont+1;
            this.estadoCantidadProductos=cont;
            console.log('mide la cadena productos total'+this.estadoCantidadProductos);

          }
        }
      } 
    });    
  }*/

 

   //funcion para obtener el producto y su precio 
  capturarItem(){
    var estado:number=0;
    this.verSeleccion=this.itemSelected;
    if(this.verSeleccion.nombre){
      this.estadoCantidadProductos=true;
    }
    this.calcularPrecio(this.verSeleccion.precioVenta);
   
  }

  //funcion para obtener el campo precio y hacer calculos
  calcularPrecio(valor1: any) { 
    let res1 :any;
    let res2:any;
    let strEx:string='';
    this.transformarPrecio(valor1);
    if(this.cantidad==null){
      this.cantidad=1;
    }
  
    if(valor1){
      valor1 = parseFloat(valor1); 
      this.p=valor1;
       console.log(this.p+'this.p');
      if( isNaN(this.p)) {
        this.total=this.tot;
      }
     
      strEx = this.tot;
      var re= /,/gi;
    //primer paso: fuera puntoss
      if(strEx && strEx.length>4){
        strEx = strEx.replace(re,"");
        
      }
      this.to=parseFloat(strEx);
      this.subTotal=this.p*this.cantidad;
      this.sub=this.subTotal;
      this.ventaS=this.sub;
     
      res2=this.subTotal.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.subTotal=res2+'';
     
      this.total=this.to+this.sub-this.a;
      
      res1=this.total.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.total=res1+'';
      this.totalist=this.total;
      
    }else{
      this.total=this.t;
      this.subTotal='';
      
    }
  }

  //funcion que recibe el valor cantidad
  calcularCantidad(valor1:any){
    let st:any='';
    st = valor1;
   //var ra= /./gi;
  //primer paso: fuera puntoss
    if(st && st.length>1){
      st = st.replace(".","");
     
    }
    this.cantidad=st;
    this.calcularCantida(this.cantidad);
  }

  //funcion que recibe el valor cantidad y realizar los calculos
  calcularCantida(valor1:any){
    this.cantidad=valor1;
    let res2 :any;
    let res3 :any;
    let strEx:string='';
  
    if(this.p==null){
      this.p=0;
    }
    if(valor1){
      if( isNaN( this.cantidad)) {
        this.total=this.tot;
      }
      strEx = this.tot;
      var re= /,/gi;
    //primer paso: fuera puntoss
      if(strEx && strEx.length>4){
        strEx = strEx.replace(re,"");
        
      }
      this.to=parseFloat(strEx);
      this.subTotal=this.p*this.cantidad;
      this.sub=this.subTotal;
      this.ventaS=this.sub;
     
      res2=this.subTotal.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.subTotal=res2+'';
      
      this.total=this.to+this.sub-this.a;
      
      res3=this.total.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.total=res3+'';
      this.totalist=this.total;
        
    }else{
      this.total=this.t;
      this.subTotal='';
    }
  }
   

  //funcion para transformar el valor del anticipo
  calcularA(valor2: any) { 
    let res3 :any;
    let totalist :any;
    this.transformarAnticipo(valor2);
    if(this.sub==null){
      this.sub=0;
    }
    if(valor2 ){
      valor2 = parseFloat(valor2);  
      this.a=valor2;
      this.anticipo=this.a;
      
      if( isNaN( this.a)) {
        this.total=this.tot;
      }
      let strEx:string='';
      strEx = this.tot;
    //primer paso: fuera comas
      var re= /,/gi;
      if(strEx && strEx.length>4){
        strEx = strEx.replace(re,"");
      }
      this.to=parseFloat(strEx);
      this.total=this.to+this.sub-this.a;
      res3=this.total.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.total=res3+'';
      totalist=this.total;
      
    }else{
      this.total=this.totalist;
    }
  }

  
//funcion para dar formato a precio
  transformarPrecio(valor1: any) { 
    this.precioReal=valor1;
    let strEx;
    let res:any;
    strEx = parseFloat(this.precioReal);
    res= strEx.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    this.precioReal=res+'';
    
  }

  //funcion para dar formato a anticipo
  transformarAnticipo(valor1: any) { 
    if(valor1){
    this.precioTrans=valor1;
  
    let strEx;
    let res:any;
    strEx = parseFloat(this.precioTrans);
    res= strEx.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    this.precioTrans=res+'';
   
    }
    else{
      this.precioTrans=0;
    }
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
  
      let strEx:string='';
      strEx = tVentas;
    //primer paso: fuera puntos
      var re= /,/gi;
      if(strEx && strEx.length>4){
        strEx = strEx.replace(re,"");
      }
      let tot=parseFloat(strEx);
      let totalV=tot+ventas;
      res1=totalV.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.sumaVentas=res1+'';
    //suma de cobros
      let strE:string='';
      strE= tCobros;
      var re= /,/gi;
      if(strE && strE.length>4){
        strE = strE.replace(re,"");
      }
      let totC=parseFloat(strE);
      let totalC=totC+this.anticipo;
      res2=totalC.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.sumaCobrado=res2+'';
  }
 ////funcion para sumar el total de ventas y cobros datos para el dashboard
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
  
      let strEx:string='';
      strEx = tVentas;
    //primer paso: fuera puntos
      var re= /,/gi;
      if(strEx && strEx.length>4){
        strEx = strEx.replace(re,"");
      }
      let tot=parseFloat(strEx);
      let totalV=tot+ventas;
      res1=totalV.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.totalVen=res1+'';
    //suma de cobros
      let strE:string='';
      strE= tCobros;
      var re= /,/gi;
      if(strE && strE.length>4){
        strE = strE.replace(re,"");
      }
      let totC=parseFloat(strE);
      let totalC=totC+this.anticipo;
      res2=totalC.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.totalCo=res2+'';
  }


  /*goToObtenerTodosProductos(){
    var nombre:any;
    var nombreoriginal:any;
    var cont:any=0;
    nombreoriginal=this.verSeleccion.nombre;
    this.productof.getAllProductos().subscribe(productos=>{
      this.productos=productos;
        for(var i=0;i<productos.length; i++){
          this.productoss=this.productosF[i];
          if(nombreoriginal==this.productoss.nombre){
            var cont=cont+1;
            this.estadoCantidadProductos=cont;
          }
        }
         
        
    }); 
  }*/

  crearproducto(){
    this.nombreProducto=this.verSeleccion.nombre;
    if(this.estadoCantidadProductos==false){
      this.productof.addNewProductoVentas(this.nombreProducto,this.precioReal,this.captureDataUrl);
      console.log('valores precio'+this.precioReal+this.precioTrans);
      this.numeroproductos=this.numeroproductos+1;
      console.log(this.numeroproductos+'numero de Productos');
    }else{
      console.log(' no se guardado producto');
    }
  }


  //funcion para crear una venta credito nueva
  goToCrearVentaCredito({value}:{value:Ventas}){
    this.crearproducto();
    //this.goToObtenerTodosProductos()
   
    this.sumarVentas();
    this.sumarVentasCliente();
    value.clienId=this.idCliente;
    value.titulo="Venta Credito";
    value.fechaCompra=(new Date()).getTime();
    value.precio=this.precioReal;
    value.anticipo=this.precioTrans;
    value.cantidad=this.cantidad;
    console.log(this.precioReal+'real'+this.precioTrans+'transformado');
    value.fechaPago=this.fecha;     

    this.numeroVentas=this.numeroVentas+1;
    this.numeroVen=this.numeroVen+1;
    if(this.anticipo==0){
      this.numeroCobros=this.numeroCobros+0;
      this.numeroPa=this.numeroPa+0;
    }else{
      this.numeroCobros=this.numeroCobros+1;
      this.numeroPa=this.numeroPa+1;
    }
    //this.crearproducto();
  
    this.authf.getAuth().subscribe(user=>{
     
    this.dashboardf.updateUsuarioTotalVentas(this.numeroproductos,this.numeroVentas,this.numeroCobros,this.sumaVentas,this.sumaCobrado);
    
    this.clientef.updateClienteDatosVenta(this.idCliente,this.numeroPa,this.numeroVen,this.totalVen,this.totalCo); 
    this.obtenerSaldoActual();   
    this.ventaf.addNewVenta(value,this.idCliente);
    
    
    });
    //this.crearproducto();
    this.navCtrl.pop();
  } 

  //funcion para obtener el saldo actual 
  obtenerSaldoActual(){
    let strE:string='';
    this.ventaf.getAnteriorVenta(this.idCliente).subscribe(ventass=>{
      this.ventass=ventass;
      if(ventass!=null){
        for(var i=0;i<ventass.length; i++){
          this.venta=this.ventass[i];
          strE=this.venta.total;
          var re= /,/gi;
          if(strE && strE.length>4){
            strE = strE.replace(re,"");
          }
          let ordenA=parseFloat(strE);
          this.clientef.updateClienteVenta(this.idCliente,this.venta.total,ordenA); 
        }
      }
    });
  }
    
  
}
