const http         = require('http'),
      path         = require('path'),
      express      = require('express'),
      contentTypes = require('./utils/content-types'),
      sysInfo      = require('./utils/sys-info'),
      env          = process.env,
      dist         = path.resolve(__dirname, '../dist');

var app = express();

// IMPORTANT: Your application HAS to respond to GET /health with status 200
//            for OpenShift health monitoring
app.get('/health', (req, res) => { res.end(); });

app.use('/', express.static(dist));

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