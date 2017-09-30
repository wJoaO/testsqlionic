import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  tamanho: number = 0;
  segundos: number = 0;

  constructor(public navCtrl: NavController,
    public storage: Storage,
    public loading: LoadingController,
    public alert: AlertController,
    public toast: ToastController) { }


  check(): void {
    let load = this.loading.create()
    load.present();
    let agora = new Date();
    this.tamanho = 0;
    this.storage.forEach((value, key, iterationNumber)=>{
      console.log("Chave: ", key, value.length);
      this.tamanho += JSON.stringify(value).length;
    }).then((data)=>{
      let depois = new Date();
      this.segundos = ( depois.getTime() - agora.getTime() ) / 1000.0;
      this.toast.create({
        message: "Foi terminado de carregar os dados locais",
        duration:2000
      });
      load.dismiss();
    }).catch(err=>{
      console.error("Algo de errado ao iterar por todos os objetos do banco local", err);
      load.dismiss();
    });
  }
}
