// import { Http, Headers } from '@angular/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the ReviewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MemberData {

  data: any;

  constructor(public http: Http) {
    this.data = null;
  }

  getMembers() {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('http://localhost:27017/api/members')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }


  saveMember(member) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:27017/api/members', JSON.stringify(member), { headers: headers })
      .subscribe(res => {
        console.log(res.json());
      });

  }

  updateMember(member) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.put('http://localhost:27017/api/members', JSON.stringify(member), { headers: headers })
      .subscribe((res) => {
        console.log(res.json());
      });

  }


  // deleteReview(id){

  //   this.http.delete('http://localhost:27017/api/reviews/' + id).subscribe((res) => {
  //     console.log(res.json());
  //   });   

  // }


  getNextMemberId() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {

      this.http.get('http://localhost:27017/api/members')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.length;
          resolve(this.data);
        });
    });

  }


}