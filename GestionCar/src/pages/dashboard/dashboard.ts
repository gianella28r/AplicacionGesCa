import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Clientes } from '../../models/clientes';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { Dashboard } from '../../models/dashboard';
import { DashboardProvider } from '../../providers/dashboard/dashboard';
import { Notas } from '../../models/notas';
import { NotasProvider } from '../../providers/notas/notas';
import { EditarNotasPage } from '../editar-notas/editar-notas';
import { DetallesClientesPage } from '../detalles-clientes/detalles-clientes';
import { ProductosProvider } from '../../providers/productos/productos';
import { ProductosPage } from '../productos/productos';
import ClientesPage from '../clientes/clientes';
import { NotasUsuarioPage } from '../notas-usuario/notas-usuario';
import { VentasProvider } from '../../providers/ventas/ventas';
import { Ventas } from '../../models/ventas';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage implements OnInit {
 // @ViewChild("barCanvas") barCanvas: ElementRef;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  @ViewChild('barCanvas') barCanvas: ElementRef;
  @ViewChild("lineCanvas") lineCanvas: ElementRef;
  @ViewChild("pieChart") pieChart;
 
   
  barChart: Chart;
  pieChartEl: Chart;
  doughnutChart: Chart;
  lineChart: Chart;

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
  modalidadC=[
    {
      id: '1',
      titulo: 'Lunes a Domingo'
    },
    {
      id: '2',
      titulo: 'Mensual'
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

  allClientesDia: Clientes = {  
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

  datosEstadoCuentas: Clientes = {  
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
  venta:any;

  clientes:Clientes[];
  cuentasCobrar:Clientes[];
  notas:Notas[];
  clientesNombres: any = [];
  clientesAdeuda: any = [];
  balance: any = [];
  chartLoading: any;
  recaudacion:any;
  fechaT: string;
  fechaActual:any='';
  dia:any='';
  mes:any='';
  anio:any='';
  fecha:any='';
  contadorNo: number=0;
  numeroNotas: number;
  numeroPagina:string;
  np:any;
  contadorCuentasCo: number=0;
  contadorProductos: number=0;
  contadorNotas: number=0;
  contadorClientes: number=0;
  totalis: number=0;
  clien: Clientes[];
  allCorriente: Clientes[];
  porVencer: Clientes[];
  proximos: Clientes[];
  vencidos: Clientes[];
  ventaDia:Ventas[];

  venDia:Ventas={
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
    saldoFavor:0,
    estadoTransaccion:true,
  }
  totalCobro: any;
  datosCobros: any=[];
  datosClientes: any=[];
  graficaCobros: any=[0,0,0];
  total: any=0;

  contadorCorriente:number=0;
  contadorProximos:number=0;
  contadorPorVencer:number=0;
  contadorVencidos:number=0;
  totalPagos: number=0;
  totalVentasCredito: number=0;
  totalVentasContado: number=0;
  notass: Notas[];
  contadorNotasTotales: number;
  productoss: any;
  contadorProductosTotales: number;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,private clientef:ClientesProvider,
    public dashboardf: DashboardProvider, public alertCtrl: AlertController,private ventaf:VentasProvider,
    private productof:ProductosProvider,private notaf:NotasProvider, public navParams: NavParams) { 
  
  }
  
  ngOnInit() {
   //this.detalleUsuario();
    //this.graficaBalance();
    //this.allClientes();
    this.getFechaActual();
    this.getDashboard();
    this.allClientes();
    this.allNotasUsuario();
    this.allCuentasporCobrar();
    this.getCorrriente();
    this.getProximos();
    this.getVencidos();
    this.getPorVencer();
    this.ClientesVentas();  
    this.allProductosUsuarios();
    this.allNotasUsuarios();
  }

  ngAfterViewInit(){
    
    //this.detalleUsuario();
    //this.allClientes()
   /* setTimeout(() => {
      
      
    }, 500)
    setTimeout(() => {
     
      //this.opciones();
    }, 1000)*/
  }


  //funcion para obtener datos del Usuario
  getDashboard(){
    let venta:string='';
    let cobro:string='';
    this.dashboardf.getDatosDashboard().subscribe(dashboard=>{
      this.dashboard=dashboard;
      this.numeroNotas=this.dashboard.contadorNotas;
      venta=this.dashboard.totalVendido;
      var re= /,/gi;
      if(venta && venta.length>3){
        venta = venta.replace(re,"");
      }
      let ven=parseFloat(venta);
      //this.balance.push(ven);

      cobro=this.dashboard.totalCobrado;
      var re= /,/gi;
      if(cobro && cobro.length>3){
        cobro= cobro.replace(re,"");
      }
      let co=parseFloat(cobro);
      this.balance.push(co);
      
      let recauda=ven-co;
      this.balance.push(recauda);
      let res=recauda.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      this.recaudacion=res+'';
      
      console.log(this.balance+'enta');
      this.doughnutChart = this.getDoughnutChart();
    });
  }
  //funcion para recuperar los 5 clientes con mayor adeudo
  allClientes(){
    this.clientef.getTopCincoClientes().subscribe(clientes=>{
      this.clientes=clientes;
      this.contadorClientes=clientes.length;
      console.log(this.contadorClientes+'datoscl');
      for(var i=0;i<clientes.length; i++){
        this.cliente=this.clientes[i];
        let adeuda=this.cliente.adeuda;
        let nombres=this.cliente.nombres;
        this.clientesAdeuda.push(adeuda);
        this.clientesNombres.push(nombres);      
     } 
     console.log(this.contadorClientes+'datosc');
    });
    console.log(this.contadorClientes+'datosclo');
  }

  //funcion para obtener fecha actual
  getFechaActual() {
  
    this.fechaActual=new Date();
    this.anio=this.fechaActual.getFullYear();
    this.mes=parseInt(this.fechaActual.getMonth())+ 1 ;
    this.dia=this.fechaActual.getDate();
   // this.fe=Date.parse(this.fecha);
    if (this.mes < 10) { 
     this.mes = "0" + this.mes
    } 
    if (this.dia < 10) { 
      this.dia  = "0" + this.dia  
    }
    this.fecha=this.anio+"-"+this.mes+"-"+this.dia;
    console.log('fechaActual'+this.fecha);
    console.log('dia'+this.dia);
    console.log('mes'+this.mes);
    console.log('año'+this.anio);
  }

   //funcion para obtener todas las notas del usuario po cumplir al dia
   allNotasUsuario(){
    this.notaf.getAllNotasRecordatorio(this.fecha).subscribe(notas=>{
      this.notas=notas;
      this.contadorNo=notas.length;
      console.log(this.notas+'notita');
    });
    console.log(this.notas+'notita');
    
  }
//obtner notas
  allNotasUsuarios(){
    this.notaf.getAllNotas().subscribe(notas=>{
      this.notass=notas;
      this.contadorNotasTotales=notas.length;
      console.log(this.notas+'notita');
    });
    console.log(this.notas+'notita');
    
  }
  //obtener productos
  allProductosUsuarios(){
    this.productof.getAllProductos().subscribe(productos=>{
      this.productoss=productos;
      this.contadorProductosTotales=productos.length;
      console.log(this.notas+'notita');
    });
    console.log(this.notas+'notita');
    
  }

  //funcion para generar las graficas
  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      data,
      options:{
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                return previousValue + currentValue;
              });
              var currentValue = dataset.data[tooltipItem.index];
              var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
              return precentage + "%";
            }
          }
        }
      },
      type: chartType
    })
  }

  //funcion para generar las graficas
  getChartBar(context, chartType, data, options?) {
    return new Chart(context, {
      data,
      options,
      type: chartType
    })
  }
  
  //funcion para generar datos para la grafica
  getDoughnutChart(){
    const data = {
      labels: ['% Cobrado', '% por Cobrar'],
      datasets: [{
        label: 'Teste Chart',
        data: this.balance,
        backgroundColor: [
          "#488aff",
          "#EC7063",          
        ],
        
      }]
    }

    return this.getChart(this.doughnutCanvas.nativeElement, 'pie', data);
  }
  
  
  getBarChart(){
    const data = {
      labels: ['Ventas Credito', 'Ventas Contado','Cobros'],
      datasets: [{
        label: 'HOY $',
        data: this.graficaCobros,
        backgroundColor: [
          "#21618C",
          "#488aff",
          "#27AE60",
        ],
        borderWidth: 1
      }]
    };

    var options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    return this.getChartBar(this.barCanvas.nativeElement, 'bar', data, options);
  }
  
  //funcion que redirige a la pagina Detalles Cliente
  editarCliente(idCliente:string){
    this.navCtrl.push(DetallesClientesPage,{ idCliente});
  }

  //funcion que redirige a la pagina Editar Nota
  editarNota(idNota:string){
    this.navCtrl.push(EditarNotasPage,{idNota});
  } 

  //funcion para eliminar Nota
  eliminarNota(nota){
     let alert = this.alertCtrl.create({
      title: 'Confirmar eliminación',
      message: '¿Estás seguro de que desea eliminar esta Nota?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // Ha respondido que no así que no hacemos nada
          }
        },
        {
          text: 'Si',
          handler: () => {
               // AquÍ borramos el sitio en la base de datos
               if(nota.imagenNota!=''){
                this.productof.deleteImagen(nota.imagenNota);
               } 
               this.numeroNotas=this.numeroNotas-1;
               this.dashboardf.updateUsuarioContadorNotas(this.numeroNotas);
               this.notaf.deleteNota(nota);
           }
        }
      ]
    });
    alert.present();
  }

  //funcion para redirigir a la pagina Gestion de Clientes
  goToClientes(){
    this.navCtrl.setRoot(ClientesPage);
  }

  //funcion para redirigir a la pagina de clientes y mostrar las cuentas por cobrar activas
  goToCuentasCobrar(){
    this.numeroPagina='1';
    this.navCtrl.setRoot(ClientesPage,{np:this.numeroPagina});
  }

  //funcion para redirigir a la pagina de clientes y mostrar las cuentas por cobrar activas
  goToCuentasAllCorriente(){
    this.numeroPagina='2';
    this.navCtrl.setRoot(ClientesPage,{np:this.numeroPagina});
  }

  //funcion para redirigir a la pagina de clientes y mostrar las cuentas proximas a cobrar
  goToCuentasAllProximas(){
    this.numeroPagina='3';
    this.navCtrl.setRoot(ClientesPage,{np:this.numeroPagina,fe:this.fecha});
  }

  //funcion para redirigir a la pagina de clientes y mostrar las cuentas por vencer
  goToCuentasAllPorVencer(){
    this.numeroPagina='4';
    this.navCtrl.setRoot(ClientesPage,{np:this.numeroPagina,fe:this.fecha});
  }

  //funcion para redirigir a la pagina de clientes y mostrar las cuentas vencidas
  goToCuentasAllVencidas(){
    this.numeroPagina='5';
    this.navCtrl.setRoot(ClientesPage,{np:this.numeroPagina,fe:this.fecha});
  }

  //funcion para redirigir a la pagina Gestion de Productos
  goToProductos(){
    this.navCtrl.setRoot(ProductosPage);
  }

  //funcion para redirigir a la pagina Gestion de Notas
  goToNotas(){
    this.navCtrl.setRoot(NotasUsuarioPage);
  }

  

  //funcion para redirigir a la pagina de clientes 
  allCuentasporCobrar(){
    this.clientef.getAllClientesCuentasCobrar().subscribe(cuentasCobrar=>{
      this.cuentasCobrar=cuentasCobrar;
      this.contadorCuentasCo=cuentasCobrar.length;
    });
    console.log(this.contadorCuentasCo+'notita');
  }

  //funcion para obtener todas las cuentas por vencer
  getPorVencer(){
    let adeuda:number=0;
    let j:number=0;
    this.clientef.getAllClientesCuentasPorVencer(this.fecha).subscribe(allProximos=>{
      this.porVencer=allProximos;
      for(var i=0; i<allProximos.length;i++){
        this.datosEstadoCuentas=this.porVencer[i];
        adeuda=this.datosEstadoCuentas.adeuda;
        if(this.datosEstadoCuentas.fechaCobro && adeuda>0.00){
            j=j+1;
        }
      }
      this.contadorPorVencer=j;
    }); 
  }

  //funcion para almacenar los id de clientes que tienen ventas
 ClientesVentas(){
  this.clientef.getAllClientesVentas().subscribe(c=>{
    this.clien=c;
    for(var i=0; i<c.length;i++){
      this.allClientesDia=this.clien[i];
      let id=this.allClientesDia.id;
      this.datosClientes.push(id);
    }
    console.log(this.datosClientes+'datosclientes');
    this.datosVentas();
  });  
}
  //funcion para sumar las ventas
  datosVentas(){
    let vi:number=0;
    let vc:number=0;
    let p:number=0;
    if(this.datosClientes){
      for(var i=0; i<this.datosClientes.length;i++){
        let idC=this.datosClientes[i];
        this.ventaf.getAllPagosDia(idC,this.fecha).subscribe(v=>{
          this.ventaDia=v;
          if(this.ventaDia){
            for(var j=0; j<v.length;j++){
              this.venDia=this.ventaDia[j];
              let titulo=this.venDia.titulo;
              if(titulo=='Venta Credito'){
                vi=vi+1;
                let vc=this.venDia.subTotal;
                this.sumarVC(vc); 
                
              }
              if(titulo=='Venta Contado'){
                vc=vc+1;
                let vco=this.venDia.pago;
                this.sumarVco(vco); 
              
              }
              if(titulo=='Pago'){
                p=p+1;
                let pago=this.venDia.pago;
                this.sumarCobros(pago); 
                
              }
            }
          }
        });
      }
      setTimeout(() => {
        this.barChart = this.getBarChart();
        console.info('entraaqui');
      }, 250)
     
    } else{
      this.barChart = this.getBarChart();
      console.info('entraaqui2');
    }
  }

  sumarCobros(pagos:any){
    
    let strEx:string='';
    let totalCobros:number; 
    if(pagos){
      let pago=pagos;
      strEx = pago;
      var re= /,/gi;
      if(strEx && strEx.length>4){
        strEx = strEx.replace(re,"");
      }
      totalCobros=parseFloat(strEx);
      this.totalPagos=this.totalPagos+totalCobros;
      console.log(this.totalPagos+'totalPagos')
    }
    this.graficaCobros[2]=this.totalPagos;
    console.log(this.graficaCobros+'graficapagos')
  }

 sumarVC(pagos:any){
    
    let strEx:string='';
    let totalCobros:number; 
    if(pagos){
      let pago=pagos;
      strEx = pago;
      var re= /,/gi;
      if(strEx && strEx.length>4){
        strEx = strEx.replace(re,"");
      }
      totalCobros=parseFloat(strEx);
      this.totalVentasCredito=this.totalVentasCredito+totalCobros;
      console.log(this.totalVentasCredito+'totalcred')
    
    }
    this.graficaCobros[0]=this.totalVentasCredito;
    console.log(this.graficaCobros+'graficacred')
  }

  sumarVco(pagos:any){
    
    let strEx:string='';
    let total:any=0;
    let totalCobros:number; 
    if(pagos){
      let pago=pagos;
      strEx = pago;
      var re= /,/gi;
      if(strEx && strEx.length>4){
        strEx = strEx.replace(re,"");
      }
      totalCobros=parseFloat(strEx);
      this.totalVentasContado=this.totalVentasContado+totalCobros;
      console.log(this.totalVentasContado+'totalcont')
    }
    this.graficaCobros[1]=this.totalVentasContado;
    console.log(this.graficaCobros+'graficacont')
  }
  
  //funcion para obtener todas las cuentas corrientes
  getCorrriente(){
    this.clientef.getAllClientesCuentasCorriente().subscribe(allCorriente=>{
      this.allCorriente=allCorriente;
      this.contadorCorriente=allCorriente.length;
    });
  }
  
 //funcion para obtener todas las cuentas proximos
  getProximos(){
    let adeuda:number=0;
    let j:number=0;
    this.clientef.getAllClientesCuentasProximas(this.fecha).subscribe(allProximos=>{
      this.proximos=allProximos;
      for(var i=0; i<allProximos.length;i++){
        this.datosEstadoCuentas=this.proximos[i];
        adeuda=this.datosEstadoCuentas.adeuda;
        if(this.datosEstadoCuentas.fechaCobro && adeuda>0.00){
          j=j+1;
        }
      }
      this.contadorProximos=j;
    });
  }

  
  //funcion para obtener todas las cuentas vencidas
  getVencidos(){
    let adeuda:number=0;
    let j:number=0;
    this.clientef.getAllClientesCuentasVencidas(this.fecha).subscribe(vencido=>{
      this.vencidos=vencido;
      for(var i=0; i<vencido.length;i++){
        this.datosEstadoCuentas=this.vencidos[i];
        adeuda=this.datosEstadoCuentas.adeuda;
        if(this.datosEstadoCuentas.fechaCobro && adeuda>0.00){
          j=j+1;
        }
      }
      this.contadorVencidos=j;
    }); 
  }
   
}



