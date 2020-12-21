import { Component ,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormaPago } from '../../models/formaPago';
import { VentasProvider } from '../../providers/ventas/ventas';
import { ClientesProvider } from '../../providers/clientes/clientes';

/**
 * Generated class for the ReagendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reagendar',
  templateUrl: 'reagendar.html',
})
export class ReagendarPage implements OnInit{
  idVentaTotal:string;
  idCliente:string;

  modalidadC: string[] = [
    'Unico Pago',
    'Diario',
    'Semanal',
    'Quincenal',
    'Mensual',
  ];

  itemSelected:string;
  verSeleccion:string;

 formaPagos:FormaPago[];
  formaPago:FormaPago={
    id:'',
    pagoAcordado:'',
    proximaFechaPago:'',
    modalidadCobro:'',
    clienNombre:'',
    clienId:'',  
    adeuda:'',
    advertencia:0,
    mensaje:'',
    mensajeFormaPago:'',
  }

  mensaje:string='';
  mensajeFechas:string='';
  fechaUP:any;
  pagoacor: any;
  formato:any;
  pagoUnico:any;
  mensajeFormaPago:string='';
  
  constructor(public navCtrl: NavController, private ventaf: VentasProvider,private clientef:ClientesProvider, public navParams: NavParams) {
    this.idCliente= navParams.get("id");
    this.idVentaTotal= navParams.get("idVentaTotal");
    console.log('iventa'+this.idVentaTotal);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReagendarPage');
  }
  ngOnInit(){
   // this.obtenerSaldoActual();
   this.obtenerFormaPago();
  }


  /*obtenerSaldoActual(){
    this.ventaf.getAnteriorVenta(this.idCliente).subscribe(ventass=>{
      this.ventass=ventass;
      console.log(this.ventass) ;
      console.log("1");
      for(var i=0;i<ventass.length; i++){
        this.venta=this.ventass[i];
        //this.clientef.updateClienteVenta(this.idCliente,this.venta.total,this.venta.fechaPP); 
     }
    });
  }*/

  capturarItem(){
    this.verSeleccion=this.itemSelected;
    //this.tituloPago=this.verSeleccion.titulo;
    console.log(this.itemSelected+'itremselecte');
    this.calcularPagos();
    
  }

  //Funcion para verificar si existe forma de pago
  obtenerFormaPago(){
    this.ventaf.getFormaPago(this.idCliente).subscribe(formaPagos=>{
      this.formaPagos=formaPagos;
      console.log("1");
      for(var i=0;i<formaPagos.length; i++){
        this.formaPago=this.formaPagos[i];
        this.itemSelected=this.formaPago.modalidadCobro;
       this.verSeleccion=this.itemSelected;
       this.fechaUP=this.formaPago.proximaFechaPago;
       this.pagoacor=this.formaPago.pagoAcordado;
        console.log(this.itemSelected+'itremselecte2');
        console.log(this.formaPago.modalidadCobro+'this.formaPago.modalidadCobro');
        this.calcularPagos();
        //this.clientef.updateClienteVenta(this.idCliente,this.venta.total,this.venta.fechaPP); 
     }
    });
  }

  pago(valor1: any) { 
    this.pagoacor = valor1; 
    /*if( isNaN( valor1)) {
      this.pagoacor='';
    }*/
  this.calcularPagos();
  console.log(this.pagoacor+'pagoac');
}

fecha(fech: any) { 
  this.fechaUP=fech;

  console.log(this.fechaUP+'fecha');
  this.calcularPagos();

}

calcularPagos(){


  if(this.verSeleccion && this.pagoacor && this.fechaUP){
    let fInicio:any='';
    let total:any='';
    let strEx:string='';
    let pago:string='';
    let pago2:any;
    let totalTransformado:any='';
    //let FechaOriginal=this.fechaUP;
    let fecha1=this.fechaUP;
    let fechaMes=this.fechaUP;
    let fechaT:any;
    let residuo=0;
    
    let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    var formato= {
      length: 0,
      addElem: function addElem(elem: any) {
          // obj.length is automatically incremented 
          // every time an element is added.
          [].push.call(this, elem);
      }
  };
    //this.formato=parse
      strEx = this.idVentaTotal;
      pago=this.pagoacor;
      let i:number;
      let j:number;
    //primer paso: fuera puntos
      if(strEx && strEx.length>4){
        strEx = strEx.replace(",","");
       //console.log(strEx+'st');
      }
      total=parseFloat(strEx);
      //console.log(total+'total parse');

      if(pago && pago.length>4){
        pago = pago.replace(",","");
      }
      pago2=parseFloat(pago);      
      

    if(this.verSeleccion=="Unico Pago"){
      this.pagoacor=this.idVentaTotal;
      this.mensaje='';
      i=0;
      this.mensaje="N°   Fecha de Cobro                    Cobrar        Adeuda  "+'\n';

      this.mensaje= this.mensaje+ " 1  " +this.fechaUP +"       $"+this.idVentaTotal +  "    0.00";
      this.mensajeFormaPago= "Adeuda $"+this.idVentaTotal+ " séra cancelado en un Unico pago el dia "+ this.fechaUP;
    }

    if(this.verSeleccion=="Diario"){
      this.mensaje='';
      i=0;
      this.mensaje="N°   Fecha de Cobro                        Cobrar        Adeuda  "+'\n';

      while(total>=pago){
        total=total-pago2;
        //console.log(total+'totalwhilr');
        i=i+1;
        var fecha = new Date(fecha1);
        var dias = i; // Número de días a agregar
        var fech:any;
        fech=fecha.setDate(fecha.getDate() + dias);
        var fecha2 =new Date(fech);
        fechaT=fecha2.toLocaleDateString("es-AR", options);
        let res= pago2.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        pago2=pago2.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        totalTransformado=total.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        this.mensaje= this.mensaje +' '+i +'    '+fechaT+'    $'+res+'      $'+totalTransformado+'\n';
        formato.addElem({ pagos: i, fecha: fechaT, pago:res, resta:totalTransformado });
       // this.formato=Object(formato);
        //this.formato = formato.slice();
      }

      if(total>0){
        i=i+1;
        var fecha = new Date(fecha1);
        var dias = i; // Número de días a agregar
        var fech:any;
        fech=fecha.setDate(fecha.getDate() + dias);
        var fecha2 =new Date(fech);
        fechaT=fecha2.toLocaleDateString("es-AR", options);
        residuo=total;
        total=residuo-total;
        let res= residuo.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        totalTransformado=total.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        formato.addElem({ pagos: i, fecha: fechaT, resta:totalTransformado });
        this.mensaje= this.mensaje +' '+i +'    '+fechaT+'    $'+res+'      $'+totalTransformado+'\n';
      }
      this.mensajeFormaPago= "Adeuda $"+this.idVentaTotal+ " séra cancelado de forma Diaria en "+i+" pago(s) de $"+this.pagoacor+" desde el dia "+ this.fechaUP;
      //this.formato=JSON.parse(formato); 

    //console.log(formato.length);
    console.log(formato);

      //console.log(this.formato+'formato');
    }


    if(this.verSeleccion=="Semanal"){
      //this.mensaje= "Adeuda $"+this.idVentaTotal+ " séra cancelado en "+i+" pago(s) de $"+this.pagoacor+" los dias "+ this.fechaUP;
      this.mensaje='';
      i=0;
      j=1;
      this.mensaje="N°   Fecha de Cobro                        Cobrar        Adeuda  "+'\n';

      while(total>=pago){
        total=total-pago2;
        //console.log(total+'totalwhilr');
        i=i+1;
       
        var fecha = new Date(fecha1);
        var dias = j; // Número de días a agregar
        var fech:any;
        fech=fecha.setDate(fecha.getDate() + dias);
        var fecha2 =new Date(fech);
        fechaT=fecha2.toLocaleDateString("es-AR", options);
        j=j+7;
        let res= pago2.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        totalTransformado=total.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        this.mensaje= this.mensaje +' '+i +'    '+fechaT+'    $'+res+'      $'+totalTransformado+'\n';
        formato.addElem({ pagos: i, fecha: fechaT, pago:res, resta:totalTransformado });
       // this.formato=Object(formato);
        //this.formato = formato.slice();
      }

      if(total>0){
        i=i+1;
        var fecha = new Date(fecha1);
        var dias = j; // Número de días a agregar
        var fech:any;
        fech=fecha.setDate(fecha.getDate() + dias);
        var fecha2 =new Date(fech);
        fechaT=fecha2.toLocaleDateString("es-AR", options);
        residuo=total;
        total=residuo-total;
        let res= residuo.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        totalTransformado=total.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        formato.addElem({ pagos: i, fecha: fechaT, resta:totalTransformado });
        this.mensaje= this.mensaje +' '+i +'    '+fechaT+'    $'+res+'      $'+totalTransformado+'\n';
      }
      this.mensajeFormaPago= "Adeuda $"+this.idVentaTotal+ " séra cancelado de forma Semanal en "+i+" pago(s) de $"+this.pagoacor+" desde el dia "+ this.fechaUP;
      //this.formato=JSON.parse(formato); 

    //console.log(formato.length);
    console.log(formato);
    
    }

    if(this.verSeleccion=="Quincenal"){
      this.mensaje='';
      i=0;
      j=1;
      this.mensaje="N°   Fecha de Cobro                        Cobrar        Adeuda  "+'\n';

      while(total>=pago){
        total=total-pago2;
        //console.log(total+'totalwhilr');
        i=i+1;
        
        var fecha = new Date(fecha1);
        var dias = j; // Número de días a agregar
        var fech:any;
        fech=fecha.setDate(fecha.getDate() + dias);
        var fecha2 =new Date(fech);
        fechaT=fecha2.toLocaleDateString("es-AR", options);
        j=j+15;
        let res= pago2.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        totalTransformado=total.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        this.mensaje= this.mensaje +' '+i +'    '+fechaT+'    $'+res+'      $'+totalTransformado+'\n';
        formato.addElem({ pagos: i, fecha: fechaT, pago:res, resta:totalTransformado });
       // this.formato=Object(formato);
        //this.formato = formato.slice();
      }

      if(total>0){
        i=i+1;
        var fecha = new Date(fecha1);
        var dias = j; // Número de días a agregar
        var fech:any;
        fech=fecha.setDate(fecha.getDate() + dias);
        var fecha2 =new Date(fech);
        fechaT=fecha2.toLocaleDateString("es-AR", options);
        residuo=total;
        total=residuo-total;
        let res= residuo.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        totalTransformado=total.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        formato.addElem({ pagos: i, fecha: fechaT, resta:totalTransformado });
        this.mensaje= this.mensaje +' '+i +'    '+fechaT+'    $'+res+'      $'+totalTransformado+'\n';
      }
      this.mensajeFormaPago= "Adeuda $"+this.idVentaTotal+ " séra cancelado de forma Quincenal en "+i+" pago(s) de $"+this.pagoacor+" desde el dia "+ this.fechaUP;
      //this.formato=JSON.parse(formato); 

    //console.log(formato.length);
    console.log(formato);
      //this.mensaje= "Adeuda $"+this.idVentaTotal+ " séra cancelado en "+i+" pago(s) de $"+this.pagoacor+" los dias "+ this.fechaUP;
    }


    if(this.verSeleccion=="Mensual"){
      this.mensaje='';
      i=0;
      j=0;
      this.mensaje="N°   Fecha de Cobro                        Cobrar        Adeuda  "+'\n';

      while(total>=pago){
        total=total-pago2;
        //console.log(total+'totalwhilr');
        i=i+1;
        var fecha = new Date(fechaMes);
        var f = fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
        console.log(fechaMes+'8mes');
        fecha = new Date(f);
       
        var meses = j; // Número de días a agregar
        var dias=i;
        var fech:any;
        fech=fecha.setMonth(fecha.getMonth() + meses);
        console.log(fech);
        var fecha2 =new Date(fech);
        console.log(fecha2);
        fechaT=fecha2.toLocaleDateString("es-AR", options);
       
        j=j+1;
        let res= pago2.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        totalTransformado=total.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        this.mensaje= this.mensaje +' '+i +'    '+fechaT+'    $'+res+'      $'+totalTransformado+'\n';
        formato.addElem({ pagos: i, fecha: fechaT, pago:res, resta:totalTransformado });
       // this.formato=Object(formato);
        //this.formato = formato.slice();
      }

      if(total>0){
        i=i+1;
        var fecha = new Date(fechaMes);
        var f = fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
        fecha = new Date(f);
        var meses =j; // Número de días a agregar
        var fech:any;
        fech=fecha.setMonth(fecha.getMonth() + meses);
        var fecha2 =new Date(fech);
        fechaT=fecha2.toLocaleDateString("es-EC", options);
        residuo=total;
        total=residuo-total;
        let res = residuo.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        totalTransformado=total.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        formato.addElem({ pagos: i, fecha: fechaT, resta:totalTransformado });
        this.mensaje= this.mensaje +' '+i +'    '+fechaT+'    $'+res+'      $'+totalTransformado+'\n';
      }
    console.log(formato);
    this.mensajeFormaPago= "Adeuda $"+this.idVentaTotal+ " séra cancelado de forma Mensual en "+i+" pago(s) de $"+this.pagoacor+" desde el dia "+ this.fechaUP;
    }
  }
  else{
    this.mensaje='';
    this.mensajeFormaPago='';
  }
}

   goToRegistrarFormaPago({value}:{value:FormaPago}){
    value.id=this.formaPago.id;
    value.modalidadCobro=this.verSeleccion;
    value.mensaje=this.mensaje;
    value.mensajeFormaPago=this.mensajeFormaPago;
    console.log(this.mensajeFormaPago+'formaPago');
    this.clientef.updateFechaCoAboMo(this.idCliente,this.fechaUP,this.pagoacor,this.verSeleccion);
    this.ventaf.updateFormaPago(value,this.idCliente);
    this.navCtrl.pop();    
  }

}
