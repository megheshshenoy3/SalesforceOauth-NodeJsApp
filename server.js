const express =require('express');
const cors=require('cors');
const app= express();
var fs = require('fs')
var https = require('https')
const path = require('path')
const querystring=require('query-string')
const bodyParser=require('body-parser');
const url=require('url')
require('dotenv/config')
const Auth=require('./routes/oauth')

app.use(bodyParser.json())
app.use(cors());

// app.listen(5000);



// https://brave-hawk-h9hmfw-dev-ed.my.salesforce.com/services/oauth2/authorize?
// client_id=3MVG9G9pzCUSkzZtrM6hBAVty5_0hHq9QyuWhI3DLziykydcEHaiVjJ2Xw8CRImeozJKa5aj_GtpKiHIAOCOL
// &redirect_uri=https://localhost:5000/RestTest/oauth/callback&
// response_type=code
const Starting=(reqs,ress)=>{
    let client_id='3MVG9G9pzCUSkzZtrM6hBAVty5_0hHq9QyuWhI3DLziykydcEHaiVjJ2Xw8CRImeozJKa5aj_GtpKiHIAOCOL'
    let querypara={
        client_id:client_id,
        redirect_uri:'https://localhost:5000/RestTest/oauth/callback',
        response_type:'code'
    }
    let querystrings=querystring.stringify(querypara)
    // const options = {
    //     hostname:'brave-hawk-h9hmfw-dev-ed.my.salesforce.com',
    //     port:443,
    //     path: `/services/oauth2/authorize?`+`/services/oauth2/authorize?client_id=3MVG9G9pzCUSkzZtrM6hBAVty5_0hHq9QyuWhI3DLziykydcEHaiVjJ2Xw8CRImeozJKa5aj_GtpKiHIAOCOL&redirect_uri=https://localhost:5000/RestTest/oauth/callback&response_type=code`,
    //     method: 'GET',
    //   }
      /*const options = new URL('https://brave-hawk-h9hmfw-dev-ed.my.salesforce.com/services/oauth2/authorize?client_id=3MVG9G9pzCUSkzZtrM6hBAVty5_0hHq9QyuWhI3DLziykydcEHaiVjJ2Xw8CRImeozJKa5aj_GtpKiHIAOCOL&redirect_uri=https://localhost:5000/RestTest/oauth/callback&response_type=code');
      const req = https.request(options, res => {
        
        console.log(`statusCode: ${res.statusCode},${options.path}`)
      })
      
      req.on('error', error => {
        console.error(error);
      })
      
      req.end()*/
      ress.redirect('https://resourceful-wolf-7qebpc-dev-ed.lightning.force.com/services/oauth2/authorize?client_id=3MVG9G9pzCUSkzZtrM6hBAVty5_0hHq9QyuWhI3DLziykydcEHaiVjJ2Xw8CRImeozJKa5aj_GtpKiHIAOCOL&redirect_uri=https://localhost:5000/RestTest/&response_type=code');  
}

app.get('/',Starting);
app.get('/RestTest/',Auth.oauthcallback)

https.createServer({
    key: fs.readFileSync(path.resolve('./localdomain.insecure.key')),
    cert: fs.readFileSync(path.resolve('./localdomain.crt')),
}, app)
.listen(5000, function () {
  console.log('Example app listening on port 5000! Go to https://localhost:5000/')
})