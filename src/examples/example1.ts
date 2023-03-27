import * as express from "express";
import * as cookieParse from "cookie-parser";
import * as session from "express-session";
import { Config } from "../config";

export class Example1 {

    run(): void {
        const httpconf = Config.getInstance().get()["portal"];
        const port : number = httpconf ["port"];
        
        var app = express();
        
        // 設置用戶指定好的簽名(秘鑰)(string).
        // 注意，由於Session通常會跟Cookie一起使用，而這個字串則必須兩邊都要相同.
        app.use(cookieParse('secret-key'));
        app.use(session({
            secret: 'secret-key',
            name: 'session-id',       // 新增一個別名connect.sid為session-id.
            resave: true,             // 即使 Session 沒做變動，是否強制重新儲存進 Store.
            saveUninitialized: false  // 是否強制將未初始化的 Session 儲存至 Store.
        }));
        
        // url: http://localhost:3003
        app.get('/', function(req:any , res:any ){
           // 從log，我們可以看到在cookies中會自動存一個session-id.
           console.log(req.signedCookies);

           // 這邊簡單的紀錄一下，頁面檢視次數.
           if(req.session.page_views){
              req.session.page_views++;
              res.send("You visited this page " + req.session.page_views + " times");
           } else {
              req.session.page_views = 1;
              res.send("Welcome to this page for the first time!");
           }
        });
        app.listen(port);
    }
}