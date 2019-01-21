import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  username:'';
  password:'';
  show:'';
  user:any[];
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .watchQuery({
      query: gql`
      {
        users{
          id
          username
          email
          password
        }
      }
`,
    })
    .valueChanges.subscribe(result => {
      this.user=result.data.users;
    });
  }
login():void{
  if(this.username== this.user[1].username && this.password==this.user[1].password){
      this.show = 'true';
  }else{
    alert('用户名或密码错误！');
  }
}
}
