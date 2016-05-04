import {Page, Loading, NavController, Alert} from 'ionic-angular';
import {PeopleService} from '../../providers/people-service/people-service';

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [PeopleService]
})
export class HomePage {
  public people: any;

  constructor(public peopleService: PeopleService,public nav: NavController){
    this.peopleService = peopleService;
    this.nav = nav;
    this.loadPeople();
  }
  
loadPeople(){
  
  let loading = Loading.create({
    content: "Please wait...",
    
  });
  this.nav.present(loading);
  
  this.peopleService.load()
  .then(data => {
    this.people = data;
    loading.dismiss();
  },
  err =>{
     this.doAlert('unbale to get data from server');
     loading.dismiss();
  });
}


doAlert(message) {
    let alert = Alert.create({
      title: 'Alert',
      subTitle: message,
      buttons: ['OK']
    });
    this.nav.present(alert);
}


}
