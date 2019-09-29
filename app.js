const fs=require('fs');
const express=require('express');
const ejs=require('ejs');
const formidable=require('formidable');
const bodyParser=require('body-parser');
const path=require('path');
const app = express();
const direct= (__dirname+'/public/files/');
const port = 2020;

app.use('/css', express.static(__dirname+'/node_modules/bootstrap/dist/css'));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/', (req,res)=>{    
    fs.readdir(direct,(err, files)=>{
        if(err){
            console.log(err)
        }else{
            res.render('notepad', {directory:files, jCreated:"", type:"" });
        }
    });
});

app.post('/',(req, res)=>{
    const destine = direct+req.body.the_name+req.body.the_type;
    console.log(destine);
    fs.writeFile(destine, req.body.doc, (err, suc)=>{
        if(err){
            console.log(err);
        }else{
            fs.readdir(direct, (error, files)=>{
                if(error){
                    console.log(error);
                }else{
                    console.log(files);
                    fs.readFile(destine,'utf8',(fails, data)=>{
                        if (fails) {
                            console.log('fails');                            
                        }else{
                            res.render('notepad',{directory:files, jCreated:data, type:req.body.the_type })
                        }
                    });
                }
            });
        }
    });

});

app.get('/test/:name', (req, res)=>{
   let file_samp = req.params.name
    fs.readdir(direct, (error, files)=>{
        if(error){
            console.log(error);
        }else{
            console.log(files);
            fs.readFile(direct+file_samp,'utf8',(fails, data)=>{
                if (fails) {
                    console.log('fails');                            
                }else{
                   console.log((file_samp).slice(-4));
                   const typo= ((file_samp).slice(-4)==".txt")?".txt":".html";
                   console.log(typo);

                    res.render('notepad',{directory:files, jCreated:data, type: typo })
                }
            });
        }
    });
});

app.listen(port,(err, suc)=>{
    if(!err){
        console.log(`Serving at port ${port}`);
    }
});

