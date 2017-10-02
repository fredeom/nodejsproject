var d = require('httpdispatcher');
d.setStatic('static');
d.setStaticDirname('');
d.onError((req, res) => { res.writeHead(404); res.end(); console.log('404...'); });
d.onGet('/', (req, res) => { res.writeHead(200, {'Content-Type' : 'text/plain'}); res.end('welcome'); });
d.onGet ('/hello', (req, res) => { res.writeHead(200, {'Content-Type' : 'text/plain'}); res.end('HELLO!'); });
d.onPost('/world', (req, res) => { res.writeHead(200, {'Content-Type' : 'text/plain'}); res.end('WORLD!'); });
require('http').createServer((req, res) => {
  try {
    console.log(req.url);
    d.dispatch(req, res);
  } catch (err) {
    console.log(err);
  };
}).listen(8090, () => { console.log('OK'); });
