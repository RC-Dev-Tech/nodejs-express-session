import * as fs from "fs"

export class Config {

    private static instance : Config;
    private data;

    static getInstance () : Config {
        if (!Config.instance){
            Config.instance = new Config ();
        }
        return Config.instance;
    }
    
    private constructor () {
        let raw = fs.readFileSync (require.resolve("../app.json"));
        this.data = JSON.parse (raw.toString ("utf8"));
    }

    public getParam (name: string) {
        return this.data [name];
    }

    public get () {
        return this.data;
    }

}
