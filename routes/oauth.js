const express =require('express');
const router= express.Router();
const https = require('https');
const http=require('http')
const request=require('request')
const qs=require('querystring')


exports.oauthcallback=(reqs,ress)=>{
    let authorizatio_code=reqs.query.code
    // ress.json(authorizatio_code);
    let code=authorizatio_code
    let client_id=('3MVG9G9pzCUSkzZtrM6hBAVty5_0hHq9QyuWhI3DLziykydcEHaiVjJ2Xw8CRImeozJKa5aj_GtpKiHIAOCOL')
    let client_secret=('3C12A9B7E1B03B698AA5B0DF7214CD64FB1D8B408E570BB085E647074173C73A')
    let uri='https%3A%2F%2Flocalhost%3A5000%2FRestTest%2Foauth%2Fcallback'
    let data='grant_type=authorization_code'+`&code=${reqs.query.code}`+'&client_id=3MVG9G9pzCUSkzZtrM6hBAVty5_0hHq9QyuWhI3DLziykydcEHaiVjJ2Xw8CRImeozJKa5aj_GtpKiHIAOCOL&client_secret=3C12A9B7E1B03B698AA5B0DF7214CD64FB1D8B408E570BB085E647074173C73A'+'&redirect_uri=https://localhost:5000/RestTest/';
    console.log(authorizatio_code)
     
    let options={
        
        url:'https://brave-hawk-h9hmfw-dev-ed.my.salesforce.com/services/oauth2/token',
        method: 'POST',
          headers: {
        //    'Authorization':'client_id=3MVG9G9pzCUSkzZtrM6hBAVty5_0hHq9QyuWhI3DLziykydcEHaiVjJ2Xw8CRImeozJKa5aj_GtpKiHIAOCOL&client_secret=3C12A9B7E1B03B698AA5B0DF7214CD64FB1D8B408E570BB085E647074173C73A',
            
            'Content-type': 'application/x-www-form-urlencoded'
       },
         body:data
    }
    request.post(options)
    console.log(data);
    const req = request.post(options,function (error, response, body){
      response=JSON.parse((body));
      if(response.hasOwnProperty("error_description")){
       ress.redirect('https://brave-hawk-h9hmfw-dev-ed.my.salesforce.com/services/oauth2/authorize?client_id=3MVG9G9pzCUSkzZtrM6hBAVty5_0hHq9QyuWhI3DLziykydcEHaiVjJ2Xw8CRImeozJKa5aj_GtpKiHIAOCOL&redirect_uri=https://localhost:5000/RestTest/&response_type=code');}
      else{
        console.log("access",body)
        let access=JSON.parse(body);
        console.log("accesstoken",access.access_token)
        ress.send(JSON.parse(body));
        // ress.redirect(`http://localhost:3000?${access.access_token}`)
        }

    })
    console.log(req)
}

