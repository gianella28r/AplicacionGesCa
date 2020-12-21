import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Ventas } from '../../models/ventas';
import { VentasProvider } from '../../providers/ventas/ventas';
import { AuthProvider } from '../../providers/auth/auth';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { DashboardProvider } from '../../providers/dashboard/dashboard';
import { Dashboard } from '../../models/dashboard';
import { Clientes } from '../../models/clientes';

/**
 * Generated class for the PagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pago',
  templateUrl: 'pago.html',
})
export class PagoPage implements OnInit {
  idCliente:any;
  ventass:Ventas[];
  i:number;

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
  } 

  tran: Ventas = {  
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
   } 

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
  }

  idTransaccionAnterior: any;
  idTran:any;
  total:any;
  tot:any;
  to:any;
  precioReal: any;

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
  sumaCobrado:any='';
  numeroCobros:number;
  cobro: any;

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

  fechaCo:any='';
  abonoCo:string;
  numeroPa:number=0;
  modalidadCo:string='';
  numeroVen:number;
  totalVen:string;
  totalCo:string;
  clienteAdeuda: any;
  sumaCobradoCli: string;
  fechaProximaPagar: any='';
  cobroResta: any;
  fecha: string;
  constructor( public navCtrl: NavController,private clientef:ClientesProvider,public dashboardf: DashboardProvider, private authf: AuthProvider ,public navParams: NavParams,private ventaf: VentasProvider) {
    this.idCliente = navParams.get("id"); 
  }

 
  ngOnInit(){
    this.anteriorVenta();
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
   
  //funcion para obtener datos del Dashboard
  detalleUsuarioDashboard(){
    this.dashboardf.getDatosDashboard().subscribe(dashboard=>{
      this.dashboard=dashboard;
      this.numeroCobros=this.dashboard.contadorCobros;
      this.sumaCobrado=this.dashboard.totalCobrado;
    });
  }
  
  //funcion para obtener anterior Venta
  anteriorVenta(){
    this.ventaf.getAnteriorVenta(this.idCliente).subscribe(ventass=>{
      this.ventass=ventass;

      if(this.ventass.length==1){
        for(var i=0;i<ventass.length; i++){
          this.venta=this.ventass[i];
          this.total=this.venta.total;
          this.tot=this.total;
       }  
      }else{
        this.total=0;
        this.tot=this.total;
      }
    });  
    
  }

  //funcion para restar valores de la adeudo total
  restarDatos() { 
    let res1 :any;
    let valor1=this.cobroResta;
    this.transformarPago(valor1);
    if(valor1){
      let strE:string='';
      strE = valor1;
    //primer paso: fuera puntos
      var re= /,/gi;
      if(strE && strE.length>4){
        strE = strE.replace(re,"");
      }
      valor1=parseFloat(strE);
      this.cobro=valor1;
     
      if( isNaN( valor1)) {
        this.total=this.tot;
      }
      let strEx:string='';
      strEx = this.tot;
    //primer paso: fuera puntos
      var re= /,/gi;
      if(strEx && strEx.length>4){
        strEx = strEx.replace(re,"");
      }
      this.to=parseFloat(strEx);
      this.total=this.to-valor1;
      
      res1=this.total.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.total=res1+'';
      
    }else{
      this.total=this.tot;
    }
  }

  //funcion para restar valores de la adeudo total
  restar(valor1: any) { 
      let res1 :any;
    this.transformarPago(valor1);
      if(valor1){
        valor1 = parseFloat(valor1); 
        this.cobro=valor1;
       
        if( isNaN( valor1)) {
          this.total=this.tot;
        }
        let strEx:string='';
        strEx = this.tot;
      //primer paso: fuera puntos
        var re= /,/gi;
        if(strEx && strEx.length>4){
          strEx = strEx.replace(re,"");
        }
        this.to=parseFloat(strEx);
        this.total=this.to-valor1;
        
        res1=this.total.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        this.total=res1+'';
        
      }else{
        this.total=this.tot;
      }
    }
  //funcion para dar formato al numero de pago
  transformarPago(valor1: any) { 
      this.precioReal=valor1;
      let strEx;
      let res:any;
      strEx = parseFloat(this.precioReal);
      res= strEx.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.precioReal=res+'';
  }

  //funcion para actualizar datos del dashboard
  sumarCobros(){
    let res2:any;;
    let tCobros:any;
    let cobro:any;
    tCobros=this.sumaCobrado;
     cobro=this.cobro;
     let strE:string='';
     strE= tCobros;
   //primer paso: fuera puntos
     var re= /,/gi;
     if(strE && strE.length>3){
       strE = strE.replace(re,"");
     }
     let totC=parseFloat(strE);
     let totalC=totC+cobro;
     res2=totalC.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
     this.sumaCobrado=res2+'';
     this.numeroCobros=this.numeroCobros+1;
     this.dashboardf.updateUsuarioTotalCobros(this.numeroCobros,this.sumaCobrado);
  }

  //funcion para actualizar datos del dashboard
  sumarCobrosClientes(){
    let res2:any;;
    let tCobros:any;
    let cobro:any;
    if(!this.totalCo){
      this.totalCo='0'
    }
    tCobros=this.totalCo;
    console.log(tCobros+'cobros');
     cobro=this.cobro;
     let strE:string='';
     strE= tCobros;
   //primer paso: fuera puntos
     var re= /,/gi;
     if(strE && strE.length>3){
       strE = strE.replace(re,"");
     }
     let totC=parseFloat(strE);
     let totalC=totC+cobro;
     res2=totalC.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
     this.sumaCobradoCli=res2+'';
     console.log(this.sumaCobradoCli+'ciobrado');
  }

  //funcion para registrar pago
  goToRegistrarPago({value}:{value:Ventas}){
    this.sumarCobros();
    this.sumarCobrosClientes();
   console.log(this.fechaProximaPagar+'fecha');
    value.titulo="Pago";
    value.fechaCompra=(new Date()).getTime();
    value.pago=this.precioReal;
    value.fechaPago=this.fecha;
    this.numeroPa=this.numeroPa+1;
    this.authf.getAuth().subscribe(user=>{
      this.ventaf.addNewVenta(value,this.idCliente);
      this.obtenerSaldoActual();
    });
    this.navCtrl.pop();    
  }
  //funcion para recuperar datos del cliente
  obtenerDatosCliente(){
    this.clientef.getOneCliente(this.idCliente).subscribe(cliente=>{
      this.cliente=cliente;
      if(cliente!=null){
        this.clienteAdeuda=cliente.adeuda;
        this.fechaCo=cliente.fechaCobro;
        this.abonoCo=cliente.abonoCobrar;
        this.numeroPa=cliente.numeroPagos;
        this.modalidadCo=cliente.modalidadC;
        this.numeroVen=cliente.numeroVentas;
        this.totalVen=cliente.totalVendido;
        this.totalCo=cliente.totalCobrado;
        console.log(this.totalCo+'total');

        if(this.clienteAdeuda && this.abonoCo){
        let adeuda=this.clienteAdeuda;
        let strE:string='';
        strE= adeuda;
        var re= /,/gi;
        if(strE && strE.length>3){
          strE = strE.replace(re,"");
        }
        let totA=parseFloat(strE);

        let cobros=this.abonoCo;
        let str:string='';
        str= cobros;
        var re= /,/gi;
        if(str && str.length>3){
          str = str.replace(re,"");
        }
        let totC=parseFloat(str);
        if(totA>totC){
          this.cobroResta=totC;
        }else{
          this.cobroResta=totA;
        }
        this.restarDatos();
        this.proximoPago();
        
      }
      }
    });
  }

  //funcion para obtenr proxima fecha de cobro
  proximoPago(){
    let total:any='';
    let strEx:string='';
      strEx = this.clienteAdeuda;
        let i:number;
        let j:number;
      //primer paso: fuera puntos
        if(strEx && strEx.length>4){
          strEx = strEx.replace(",","");
         //console.log(strEx+'st');
        }
        total=parseFloat(strEx);
   this.fechaProximaPagar=this.fechaCo;
   
   console.log(this.fechaCo+'fecha');
   console.log(this.clienteAdeuda+'fecha');
   console.log(this.modalidadCo+'fecha');
   console.log(total+'fecha');
    if(this.modalidadCo && this.fechaCo && total>0){
      //let FechaOriginal=this.fechaUP;
      let fecha1:string;
      fecha1=this.fechaCo;
      let fechaMes=this.fechaCo;
      let fechaT:any;
      let options = {day: "numeric", month: "numeric", year: "numeric"};
      let anio:any;
      let mes:any;
      let dia:any;
      if(this.modalidadCo=="Diario"){
        j=1;
        var fecha = new Date(fecha1);
        var dias = j; // Número de días a agregar
        var fech:any;
        fech=fecha.setDate(fecha.getDate() + dias);
        var fecha2 =new Date(fech);
        var f = fecha2.setMinutes(fecha2.getMinutes() + fecha2.getTimezoneOffset());
        fechaT= new Date(f);
        anio=fechaT.getFullYear();
        mes=parseInt(fechaT.getMonth())+ 1 ;
        dia=fechaT.getDate();
 // this.fe=Date.parse(this.fecha);
        if (mes < 10) { 
        mes = "0" + mes
        } 
        if (dia < 10) { 
          dia  = "0" + dia  
        }
      this.fechaProximaPagar=anio+"-"+mes+"-"+dia; 
        //this.fechaProximaPagar=fechaT;
        console.log(this.fechaProximaPagar+'fechad2');
       
       
        console.log(this.fechaProximaPagar+'fecha');
      } 
      if(this.modalidadCo=="Semanal"){      
        j=7;
          var fecha = new Date(fecha1);
          var dias = j; // Número de días a agregar
          var fech:any;
          fech=fecha.setDate(fecha.getDate() + dias);
          var fecha2 =new Date(fech);
          var f = fecha2.setMinutes(fecha2.getMinutes() + fecha2.getTimezoneOffset());
          fechaT= new Date(f);
          anio=fechaT.getFullYear();
          mes=parseInt(fechaT.getMonth())+ 1 ;
          dia=fechaT.getDate();
   // this.fe=Date.parse(this.fecha);
          if (mes < 10) { 
          mes = "0" + mes
          } 
          if (dia < 10) { 
            dia  = "0" + dia  
          }
        this.fechaProximaPagar=anio+"-"+mes+"-"+dia; 
          //this.fechaProximaPagar=fechaT;
          console.log(this.fechaProximaPagar+'fechad2');
      } 
      if(this.modalidadCo=="Quincenal"){
        j=15;
          var fecha = new Date(fecha1);
          var dias = j; // Número de días a agregar
          var fech:any;
          fech=fecha.setDate(fecha.getDate() + dias);
          var fecha2 =new Date(fech);
          var f = fecha2.setMinutes(fecha2.getMinutes() + fecha2.getTimezoneOffset());
          fechaT= new Date(f);
          anio=fechaT.getFullYear();
          mes=parseInt(fechaT.getMonth())+ 1 ;
          dia=fechaT.getDate();
   // this.fe=Date.parse(this.fecha);
          if (mes < 10) { 
          mes = "0" + mes
          } 
          if (dia < 10) { 
            dia  = "0" + dia  
          }
        this.fechaProximaPagar=anio+"-"+mes+"-"+dia; 
          //this.fechaProximaPagar=fechaT;
          console.log(this.fechaProximaPagar+'fechad2');
      } 
      if(this.modalidadCo=="Mensual"){
        i=1;
        j=1;
        var fecha = new Date(fechaMes);
        var f = fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
        console.log(fechaMes+'8mes');
        fecha = new Date(f);
         
        var meses = j; // Número de días a agregar
        var dias=i;
        var fech:any;
        fech=fecha.setMonth(fecha.getMonth() + meses);
        console.log(fech);
        fechaT =new Date(fech);
        anio=fechaT.getFullYear();
        mes=parseInt(fechaT.getMonth())+ 1 ;
        dia=fechaT.getDate();
   // this.fe=Date.parse(this.fecha);
          if (mes < 10) { 
          mes = "0" + mes
          } 
          if (dia < 10) { 
            dia  = "0" + dia  
          }
        this.fechaProximaPagar=anio+"-"+mes+"-"+dia; 
        console.log(this.fechaProximaPagar+'MENSUAL');
        }
    }
  }

  //funcion para guardar en cliente el adeudo actual
  obtenerSaldoActual(){
   
    this.ventaf.getAnteriorVenta(this.idCliente).subscribe(ventass=>{
      let strE:string='';
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
          this.clientef.updateClientePago(this.idCliente,this.venta.total,ordenA,this.sumaCobradoCli,this.numeroPa,this.fechaProximaPagar); 
        }
      } 
    });
  }

}
