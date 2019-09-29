"use strict"
const fs=require('fs');

class File{
    constructor(){

    }

    static readFiles(path){
        return new Promise((resolve, reject)=>{
            fs.readFile(path, (err, data)=>{
                if(!err){
                    resolve(data.toString())
                }
                else{
                    reject(err)
                }
            })
        })
    }

}


module.exports = File;