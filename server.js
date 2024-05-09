const express = require('express');
const app = express();
var path = require('path')
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const pipedrive = require('pipedrive');
var bodyParser = require('body-parser')
var addDeal = require('./addDeal');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['key1']
}));

const apiClient = new pipedrive.ApiClient();
const port = process.env.PORT;

let oauth2 = apiClient.authentications.oauth2;
oauth2.clientId = process.env.clientID;
oauth2.clientSecret = process.env.clientSecret;
oauth2.redirectUri = 'http://localhost:3000/callback';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/callback', (req, res) => {
  const authCode = req.query.code;
  const promise = apiClient.authorize(authCode);

  promise.then(() => {
      req.session.accessToken = apiClient.authentications.oauth2.accessToken;
      res.redirect('/');
      console.log('Redirected to index.html')
  }, (exception) => {
      console.log("some error: "+ exception);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/sendDealData', (req, res) => {
  if (req.session.accessToken !== null && req.session.accessToken !== undefined) {
  console.log(req.body);
  addDeal.addDeal(req.body, apiClient).then((deal_id)=>{
    res.send('Job is created! https://daniel-sandbox12.pipedrive.com/deal/'+deal_id+'')
  });
  }else{
    const authUrl = apiClient.buildAuthorizationUrl();;
    res.redirect(authUrl);
  }
});

app.get('/getDeals', async (req, res) => {
  if (req.session.accessToken !== null && req.session.accessToken !== undefined) {
      const api = new pipedrive.DealsApi(apiClient);
      const deals = await api.getDeals();
      res.send(deals);
  } else {
      const authUrl = apiClient.buildAuthorizationUrl();;
      res.redirect(authUrl);
  }
});

app.listen(port, () => {
  console.log('Server started on http://localhost:'+port);
});
