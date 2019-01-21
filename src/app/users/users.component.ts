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
  user:{};
  //初始化 
  constructor(private apollo: Apollo) { }
  
  ngOnInit() {
  //   第一次启动 会有点问题  
  //   启动服务器后 等待网页出现 Cannot GET / 后  请将以下代码注释 等页面加载出来后    再将这段代码打开

    //   开始注释
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
    //结束注释


    
  }
login():void{
  //判断点击完按钮  用户输入的值是否和请求回来的值一致
  if(this.username==this.user[1].username && this.password==this.user[1].password){
      this.show = 'true';
  }else{
    alert('用户名或密码错误！');
  }
}
}
