import { Component,OnInit  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormaPago } from '../../models/formaPago';
import { Ventas } from '../../models/ventas';
import { VentasProvider } from '../../providers/ventas/ventas';
import { ClientesProvider } from '../../providers/clientes/clientes';

/**
 * Generated class for the AgendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agendar',
  templateUrl: 'agendar.html',
})
export class AgendarPage implements OnInit{

  idVentaTotal:any;
  idCliente:any;
  
  ventass:Ventas[];
  formaPagos:FormaPago={
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

  venta: Ventas = {  
   id:'',
   titulo:'',
   nombreProducto:'',
   fechaCompra:'',
   saldoActual:'',
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

  itemSelected={
   id:'',
   titulo:'',
 }
  verSeleccion={
   id:'',
   titulo:'',
 }
 
  mensaje:string='';
  mensajeFormaPago:string='';
  fechaUP:any;
  pagoacor: any;
  //formato: [];
  formato:any;
  pagoUnico:any;
  mensajeFechas: string='';
  pagos:any=[];
  fechaCobro:any=[];
  cobro:any=[];
  resta:any=[];
  //private formato: Array<{pagos: number, fecha: any, resta:any}>;
  constructor(public navCtrl: NavController, private ventaf: VentasProvider, public navParams: NavParams,private clientef:ClientesProvider) {
    this.idCliente= navParams.get("id");
    this.idVentaTotal= navParams.get("idVentaTotal");
    console.log('iagendarenta'+this.idVentaTotal);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReagendarPage');
  }
  ngOnInit(){
    //this.obtenerSaldoActual();
  }

  capturarItem(){
    this.verSeleccion=this.itemSelected;
    console.log(this.verSeleccion.titulo+'titulo');
    this.calcularPagos();
  }

  pago(valor1: any) { 
      this.pagoacor = valor1; 
      /*if( isNaN( valor1)) {
        this.pagoacor='';
      }*/
    this.calcularPagos();
    console.log(this.pagoacor+'pagoac');
  }

  //Funcion para obtener fecha
  fecha(fech: any) { 
    this.fechaUP=fech;
    console.log(this.fechaUP+'fecha');
    this.calcularPagos();
  
  }

  calcularPagos(){
    if(this.verSeleccion.titulo && this.pagoacor && this.fechaUP){
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
        

      if(this.verSeleccion.titulo=="Unico Pago"){
        this.pagoUnico=this.idVentaTotal;
        this.mensaje='';
        i=0;
        this.mensaje="N°   Fecha de Cobro               Cobrar                Adeuda  "+'\n';
 
        this.mensaje= this.mensaje+ " 1  " +this.fechaUP +"       $"+this.idVentaTotal +  "    0.00";
        this.mensajeFormaPago= "Adeuda $"+this.idVentaTotal+ " séra cancelado en un Unico pago el dia "+ this.fechaUP;
      }

      if(this.verSeleccion.titulo=="Diario"){
        this.resta=[];
        this.mensaje='';
        i=0;
        this.mensaje="N°   Fecha de Cobro                                 Cobrar           Adeuda  "+'\n';

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
          this.pagos.push(i);
          this.fechaCobro.push(fechaT);
          this.cobro.push(res);
          this.resta.push(totalTransformado);
          console.log(this.fechaCobro+'fechapagos');
          console.log(this.pagos+'pagos');
          
          console.log(this.resta+'resrta');
          this.mensaje= this.mensaje +' '+i +'    '+fechaT+'    $'+res+'      $'+totalTransformado+'\n';
          formato.addElem({ pagos: i, fecha: fechaT, pago:res, resta:totalTransformado });
         this.formato=Object(formato);
        // this.formato=JSON.stringify(formato);
          console.log(this.formato+'formato')
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
        let format= Object.keys(formato);
        // Step 2. Create an empty array.
                  let goodResponse = [];
        // Step 3. Iterate throw all keys.
                  for (const fort of format) { 
                    goodResponse.push (formato [fort]);
                  }

        //this.formato=JSON.parse(formato); 

      //console.log(formato.length);
      console.log(goodResponse+'RESPONSE');

        //console.log(this.formato+'formato');
      }


      if(this.verSeleccion.titulo=="Semanal"){
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

      if(this.verSeleccion.titulo=="Quincenal"){
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


      if(this.verSeleccion.titulo=="Mensual"){
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
        this.mensajeFormaPago= "Adeuda $"+this.idVentaTotal+ " séra cancelado de forma Mensual en "+i+" pago(s) de $"+this.pagoacor+" desde el dia "+ this.fechaUP;
      console.log(formato);
      }
    }
    else{
      this.mensaje='';
      this.mensajeFormaPago='';
      this.mensajeFechas='';
    }
  }



   goToRegistrarFormaPago({value}:{value:FormaPago}){
    value.modalidadCobro=this.verSeleccion.titulo;
    value.mensaje=this.mensaje;
    value.mensajeFormaPago=this.mensajeFormaPago;
    this.clientef.updateFechaCoAboMo(this.idCliente,this.fechaUP,this.pagoacor,this.verSeleccion.titulo);
    this.ventaf.addNewFormaPago(value,this.idCliente);
   
    this.navCtrl.pop();    
  }

}
