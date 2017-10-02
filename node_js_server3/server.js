const fs = require('fs');
const spawn = require('child_process').spawn;
const Canvas = require('canvas');
const Image = Canvas.Image;
//const execFile = require('child_process').execFile;
//const ss = spawn('gnome-screenshot', ['--file', 's.png']);


var cnt = 0;
setTimeout(callback, 1000);

function callback() {
  const ss = spawn('scrot', ['-b', '-d', '0', 's.png'/*'\'.\\images\\%Y:%m:%d:%H:%M:%s.png\''*/, '-e', '\'mv', '$f', 'images\'']);
  ss.on('close', (code) => {
    console.log('CHILD: ' + code);
    fs.readFile(__dirname + '/s.png', (err, spng) => {
      if (err) { console.log(err); };
      //console.log(spng);
      //fs.writeFile('_s.png', spng);
      var img = new Image;
      img.src = spng;
      var W = 200;
      var H = 200;
      var canvas = new Canvas(W, H);
      var ctx = canvas.getContext('2d');
      ctx.font = '30px Impact';
      //ctx.rotate(.1);
      ctx.transform(1, 0.01, -0.06, 1, 0, 0);
      ctx.drawImage(img, 0, 0, W, H);
      ctx.strokeStyle="#FF5599";
      ctx.fillText('Овсaм!', W / 3, H * 4 / 5);
      //fs.writeFile('_2s.png', canvas.toBuffer());
      //ctx.rotate(.1);
      //var dataUrl = canvas.toDataURL();
      //console.log(dataUrl);
      canvas.toDataURL('image/jpeg', 0.5, (err, jpeg) => {
        if (err) { console.log(err); } else {
          var Pusher = require('pusher');
          var pusher = new Pusher({ appId: '260399',
                                    key: '3ca1a14afda7c3610dac', secret: '222d946b1f5f44491b5c',
                                    cluster: 'eu', encrypted: true,
                                    proxy: 'http://proxy.mera.ru:8080',
                                    keepAlive: true
          });
          //console.log(jpeg);
          console.log('sent... ' + cnt++);
          //jpeg = "" + cnt;
          pusher.trigger('test_channel', 'my_event', { "message": jpeg });
          console.log('pushed?');
          setTimeout(callback, 200);
        }
      });
    });
  });
};


    //fs.readFile('s.png', (error, data) => {
    //  var b64 = data.toString('base64');
    //  var db64 = new Buffer(b64, 'base64').toString('binary');
    //  fs.writeFile('s_.png', db64, 'binary', (error)=>{ if(error)console.log(error); });
    //});


//fs.watch('./images', {encoding: 'buffer'}, (eventType, filename) => {
//  if (filename) {
//    if (fs.accessSync(./images/filename))
//    console.log(filename);
//  };
//});
