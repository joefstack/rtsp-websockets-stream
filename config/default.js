const config = {
  relay: {
    ffmpeg: "/usr/local/bin/ffmpeg",
    tasks: [
      {
        app: "cctv",
        mode: "static",
        edge:
          "rtsp://admin:Aottech123@216.232.132.54:554/Streaming/Channels/101",
        name: "aot-demo",
        rtsp_transport: "tcp" //['udp', 'tcp', 'udp_multicast', 'http']
      },
      {
        app: "iptv",
        mode: "static",
        edge: "rtmp://live.hkstv.hk.lxdns.com/live/hks",
        name: "hks"
      },
      {
        app: "mv",
        mode: "static",
        edge: "/Volumes/ExtData/Movies/Dancing.Queen-SD.mp4",
        name: "dq"
      }
    ]
  }
};

module.exports = config;
