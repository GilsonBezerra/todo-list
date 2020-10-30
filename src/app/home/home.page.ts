import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks: any[] = [];

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  async showAdd() {
    const alert = this.alertCtrl.create({
      backdropDismiss: false,
      header: 'O que deseja fazer?',
      inputs: [
        {
          name: 'taskToDo',
          type: 'text',
          placeholder: 'Comprar pão'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confim Cancel');
          }
        },
        {
          text: 'Adicionar',
          handler: (form) => {
            this.add(form.taskToDo);
            
          }
        }
      ]
    });
    (await alert).present();
  }

  async add(taskToDo: string) {
    if (taskToDo.trim().length < 1) {
      const toast = await this.toastCtrl.create({
        message: 'Informe o que deseja fazer!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }
    let task = { name: taskToDo, done: false };
    this.tasks.push(task);
  }

  async openActions(task: any) {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'O QUE DESEJA FAZER?',
    buttons: [{
      text: task.done ? 'Desmarcar' : 'Marcar',
      icon: task.done ? 'radio-button-off' : 'checkmark-circle',
      handler: () => {
        task.done = !task.done;
      }
    },
      {
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });

  await actionSheet.present();
}


}
