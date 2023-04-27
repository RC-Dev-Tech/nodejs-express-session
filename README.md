# ![](https://drive.google.com/uc?id=10INx5_pkhMcYRdx_OO4rXNXxcsvPtBYq) NodeJs - Express Session
> ##### 理論請自行找，網路上有很多相關的文章，這邊只關注於範例實作的部分.

<br>

<!--ts-->
## 目錄
* [簡介](#簡介)
* [使用套件](#使用套件)
* [操作說明](#操作說明)
* [屬性說明](#屬性說明)
* [切換範例](#切換範例)
* [延伸項目](#延伸項目)
* [參考資料](#參考資料)
* [備註](#備註)
<!--te-->

---
<br>

## 簡介
什麼是Session? 用白話一點的說法就是客戶連接後，後端給的臨時身份證明，<br>
大概可以想像成就是，當你想去圖書館借書時，首先你要先註冊圖書館的會員，<br>
接下來每次當你去圖書館的時候，圖書館都會根據你的會籍而發給你一張臨時的借書證，<br>
而你就可以藉由這張臨時的借書證在圖書館進行借書跟還書的動作.<br>
這張臨時的借書證就相當於Session.<br>

當客戶端跟後端驗證身份後的每次連接，<br>
後端可以針對該客戶端去生成一把密鑰來當成是Session的id，<br>
並且在連接後的response中回覆給客戶端.<br>
而客戶端在進行階段性相關的後端操作請求，則必須附上這個Session的id,<br>
以示證明該客戶跟後端是認識的，並且可以合法地進行操作.<br>

Cookie跟Session有什麼不同呢？如果真的硬要比的話，<br>
可以把Cookie當成是客戶端專用的網頁暫存資料，<br>
而Session則是後端專用的客戶暫存資料.<br>
> session資料不會儲存在cookie裡，cookie存的是sessionID.<br>
> session資料是儲存在server端.<br>

實作範例:
- [Example1](https://github.com/RC-Dev-Tech/nodejs-express-session/blob/main/src/examples/example1.ts) - 基本session的使用方式.
- [Example2](https://github.com/RC-Dev-Tech/nodejs-express-session/blob/main/src/examples/example2.ts) - 簡易版登入實作.

---
<br>

## 使用套件.
- express
- cookie-parser
- express-session

---
<br>

## 操作說明.
#### 1. 安裝套件 [^1]
> npm install --save
#### 2. 編譯 & 運行
> npm run start

---
<br>

## 屬性說明
**express.use(session({屬性})):**
- cookie：儲存 sessionID 的 Cookie 的形式. (這邊的設置跟Cookie-Parser相同)
- genid：產生 sessionID 的方式.
- name：儲存 sessionID 的那個 Cookie 的名稱，預設是 connect.sid.
- resave：即使 Session 沒做變動，是否強制重新儲存進 Store.
- rolling：是否每次 Request 都強制更換 sessionID.
- saveUninitialized：是否強制將未初始化的 Session 儲存至 Store.（新產生的 Session）
- secret：用來認證該 Session 的資料。（必填）
- store：儲存 Session 的地方，預設 MemoryStore.
- unset：設定是否刪除或保留.（'destroy' 或 'keep'）

---
<br>

## 切換範例
> 編輯在app.json中的"exsample_mode"，填入的數字代表第幾個範例.

---
<br>

## 延伸項目
* [NodeJs 系列實作](https://github.com/RC-Dev-Tech/nodejs-index) <br>

---
<br>

## 參考資料
* [Basic Login System with Node.js, Express, and MySQL](https://codeshack.io/basic-login-system-nodejs-express-mysql/) <br>
* [[Node.js] cookie-session驗證原理以及express-session套件使用](https://medium.com/johnny%E7%9A%84%E8%BD%89%E8%81%B7%E5%B7%A5%E7%A8%8B%E5%B8%AB%E7%AD%86%E8%A8%98/node-js-cookie-session%E9%A9%97%E8%AD%89%E5%8E%9F%E7%90%86%E4%BB%A5%E5%8F%8Aexpress-session%E5%A5%97%E4%BB%B6%E4%BD%BF%E7%94%A8-aeafa386837e) <br>
* [191015學習筆記 Express - Session](https://ithelp.ithome.com.tw/articles/10228375) <br>
* [express express-session 小书](https://segmentfault.com/a/1190000017341279?utm_source=sf-similar-article) <br>
* [What really is the difference between session and token based authentication](https://dev.to/thecodearcher/what-really-is-the-difference-between-session-and-token-based-authentication-2o39) <br>
* [ExpressJS - Sessions](https://www.tutorialspoint.com/expressjs/expressjs_sessions.htm#) <br>
* [session 在 express 上的應用 – 登入實作為例](https://ithelp.ithome.com.tw/articles/10187464) <br>
* [Session Management in Node.js using ExpressJS and Express Session](https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/) <br>
* [Nodejs进阶：express+session实现简易身份认证](https://www.cnblogs.com/chyingp/p/nodejs-learning-express-session.html) <br>

---
<!--ts-->
#### [目錄 ↩](#目錄)
<!--te-->
---
## 備註：

[^1]: 在這個範例中我們需要安裝部分套件，指令如下：<br>
`npm install express --save` <br>
`npm install cookie-parser --save` <br>
`npm install express-session --save` <br>
因為這些套件已經有被安裝並整合在package.json中，所以這邊直接下**npm install --save**的指令就好
