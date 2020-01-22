const WebSocket = require("ws");
const Stream = require("node-rtsp-stream-es6");
const NodeMediaServer = require("node-media-server");

const wss = new WebSocket.Server({ port: 7777 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

// const options = {
//   name: "aot-demo",
//   url: "rtsp://admin:Aottech123@216.232.132.54:554/Streaming/Channels/101",
//   port: 5000
// };

// stream = new Stream(options);

// stream.start();

const config = {
  logType: 3, // 3 - Log everything (debug)
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30
  },
  http: {
    port: 8000,
    allow_origin: "*"
  },
  relay: {
    ffmpeg: "/usr/bin/ffmpeg",
    tasks: [
      {
        app: "cctv",
        mode: "static",
        edge: "rtsp://admin:Aottech123@216.232.132.54:554/Streaming/Channels/101",
        name: "aot-demo",
        rtsp_transport: "tcp" //['udp', 'tcp', 'udp_multicast', 'http']
      }
    ]
  }
};

var nms = new NodeMediaServer(config);
nms.run();
