import React, { Component } from "react";
import ReactPlayer from "react-player";

class Stream extends Component {
  render() {
    return <ReactPlayer url="rtmp://localhost:1935/cctv/aot-demo" playing />;
  }
}

export default Stream;
