import * as express from "express";
import * as cookieParse from "cookie-parser";
import * as session from "express-session";
import { Config } from "../config";

export class Example2 {
    protected userDB = new Map();

    run(): void {
        const httpconf = Config.getInstance().get()["portal"];
        const port : number = httpconf ["port"];
        
        var app = express();
        
        // 設置用戶指定好的簽名(秘鑰)(string).
        // 注意，由於Session通常會跟Cookie一起使用，而這個字串則必須兩邊都要相同.
        app.use(cookieParse('secret-key'));
        app.use(session({
            secret: 'secret-key',
            resave: false,                  // 即使 Session 沒做變動，是否強制重新儲存進 Store.
            saveUninitialized: true,        // 是否強制將未初始化的 Session 儲存至 Store.
            cookie:{
                maxAge: 1000 * 60 * 60 * 2, // 該cookie只保留兩個小時.
            },
            rolling:true,                   // 是否每次 Request 都強制更換 sessionID.
        }));
        
        // 登入頁面.
        // url: http://localhost:3003/login?id=ricky&pwd=1234
        app.get('/login', (req:any , res:any) => {
            console.log(`/login, cookies => `);console.log(req.signedCookies);
            console.log(`/login, req.session => `);console.log(req.session);
            console.log(`/login, userDB => `);console.log(this.userDB);

            var id:string = req.query.id.toString();
            var pwd:string = req.query.pwd.toString();
            var user_id: string = id + pwd;

            if(id && pwd){
                if(this.userDB.has(user_id)){
                    res.send('該用戶已登入!');
                } else{
                    req.session.USER_ID = user_id;
                    this.userDB.set(user_id, id);
                    res.redirect('/');
                }
            }else{
                res.send('登入失敗，請輸入正確的帳密!');
            }
        });
        
        // 登出頁面.
        // url: http://localhost:3003/logout
        app.get('/logout', (req: any, res: any)=>{
            console.log(`/logout, cookies => `);console.log(req.signedCookies);
            console.log(`/logout, req.session => `);console.log(req.session);
            console.log(`/logout, userDB => `);console.log(this.userDB);

            const user_id = req.session.USER_ID;
            req.session.destroy((err: any)=>{
                if(err || !this.userDB.has(user_id)){
                    res.send('登出失敗');
                } else{
                    this.userDB.delete(user_id);
                    res.send('登出成功');
                }
            });
        });
        
        // 首頁.
        // url: http://localhost:3003
        app.get('/', (req: any, res: any) => {
            console.log(`/, cookies => `);console.log(req.signedCookies);
            console.log(`/, req.session => `);console.log(req.session);
            console.log(`/, userDB => `);console.log(this.userDB);

            if(req.session.USER_ID && this.userDB.has(req.session.USER_ID)){
                res.send(`歡迎回來${this.userDB.get(req.session.USER_ID)}`);
            } else{
                res.send('請先登入!');
            }
        });

        // 404錯誤頁面.
        app.use((req: any, res:any) => {
            res.send('404 not found');
        });

        app.listen(port);
    }
}