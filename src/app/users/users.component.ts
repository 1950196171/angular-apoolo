import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular'; //引入apollo
import gql from 'graphql-tag'; //引入gql
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  //绑定数据
  username:'';
  password:'';
  // 定义show为空
  show:'';
  user:any[];
  //初始化 
  constructor(private apollo: Apollo) { }
  //生命周期函数 直接去拿数据
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
  //判断点击完按钮  用户输入的值是否和请求回来的值一致
  if(this.username== this.user[1].username && this.password==this.user[1].password){
      this.show = 'true';
  }else{
    alert('用户名或密码错误！');
  }
}
}
