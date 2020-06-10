var http = require('http');
/**
 * Incluya el módulo Formidable para poder analizar el archivo 
 * cargado una vez que llegue al servidor.
 */
var formidable = require('formidable');
var fs = require('fs');

http.createServer( function (req,res){
    if(req.url == '/fileupload'){
        var form = new formidable.IncomingForm();
        form.parse(req,function(err,fields,files){
            //toma la ruta del archivo (del atributo name del campo de entrada)
            var oldpath = files.filetoupload.path;
            var newpath = 'C:/Users/Efren/NodeFile/'+files.filetoupload.name;
            fs.rename(oldpath,newpath,function(err){
                if(err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        });
    }else{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<form action="fileupload" method="post" name="form_file_upload" enctype="multipart/form-data">');
        res.write('<label for="id_file_upload">Select file:</label></br></br>');
        res.write('<input type="file" id="id_file_upload" name="filetoupload"></br></br>');
        res.write(' <input type="submit" value="enviar">');
        res.write('</form>');
        return res.end();  
    }
}).listen(8080);