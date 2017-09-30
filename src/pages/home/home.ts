import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public http: Http,
    public loading: LoadingController,
    public storage: Storage,
    public alert: AlertController,
    public toast: ToastController) { }


  download(qtde: number): void {
    let loader = this.loading.create();
    let alertStorage = this.alert.create({
      title: "Algo de errado aconteceu",
      message: "Algo de errado aconteceu com o storage"
    });
    let alertHttp = this.alert.create({
      title: "Algo de errado aconteceu",
      message: "Algo de errado aconteceu com o Http"
    });
    loader.present();
    this.http.get(`./assets/mock/MOCK_DATA.json`)
      .map(res => res.json())
      .subscribe((dados) => {
        let fim = [];
        console.log("Dados: ", dados);
        while(qtde > 0){
          fim = fim.concat(dados);
          qtde--;
        }
        console.log("Fim: ", fim);
        this.storage.set(this.makeRandomString(), fim).then(() => {
          console.log("Sucesso ao guardar os dados");
          this.toast.create({
            message: "Adicionado novos dados no banco local com sucesso",
            duration: 1000
          }).present();
          loader.dismiss();
        }).catch((err) => {
          console.error(err);
          loader.dismiss();
          alertStorage.present();
        });
      }, err =>{
        console.error(err);
        loader.dismiss();
        alertHttp.present();
      });
  }


  /**
   * Gera uma string de tamanho 12 com caracteres aleatórios alfabéticos maiúsculos, minúsculos e números.
   */
  makeRandomString(): string {
    var text: string = "";
    var possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var date = new Date();
    var time = date.getTime();
    while (time) {
      var mod = time % 62;
      text = possible[mod] + text;
      time = Math.floor(time / 62);
    }

    for (var i = text.length; i < 12; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
