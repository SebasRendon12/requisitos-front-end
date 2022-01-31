export class cReceipt {
  id: number = 0; //PK
  estado: string = "pendiente"; //pendiente, pagado, enProceso
  anno: number = new Date().getFullYear();
  periodo: number = 1;
  valor: number = 0;
  fechaPago: Date = new Date();
  fechaPagoExtemporaneo: Date = new Date();
  fechaPagoExitoso?: Date = undefined;
  recibo: string = "";
  porcentajeMora: number = 0;//Porcentaje incremento pago extemporaneo 0-100
}