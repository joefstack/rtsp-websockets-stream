const NodeMediaServer = require("node-media-server"),
  config = require("./config/default").rtmp_server;

nms = new NodeMediaServer(config);

module.exports = nms;
