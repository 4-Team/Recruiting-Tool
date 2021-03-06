const http         = require('http'),
      path         = require('path'),
      express      = require('express'),
      sysInfo      = require('./utils/sys-info'),
      env          = process.env;

var app = express();

// IMPORTANT: Your application HAS to respond to GET /health with status 200
//            for OpenShift health monitoring
app.get('/health', (req, res) => { res.end(); });

app.use('/', express.static(path.resolve(__dirname, '../dist')));

app.get('/info/gen', (req, res) => {
  res.json(sysInfo['gen']());
});
app.get('/info/poll', (req, res) => {
  res.json(sysInfo['poll']());
});

// start the server.
app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', () => {
  console.log(`Application worker ${process.pid} started...`);
});