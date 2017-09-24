const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 8083));
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log("Running at localhost:" + app.get('port'));
});
