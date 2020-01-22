import React from "react";
// import Link from "@material-ui/core/Link";
// import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./pages/Title";
import Stream from "./Stream";

class Payload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: []
    };
  }
  ws = new WebSocket("ws://localhost:7777");

  componentDidMount() {
    this.ws.onopen = () => {
      console.log("Metadata WS Connected");
    };

    this.ws.onmessage = evt => {
      let data = JSON.parse(evt.data);
      this.setState(state => ({ payload: [data, ...state.payload] }));
    };

    this.ws.onclose = () => {
      console.log("Metadata WS Disconnected");
      this.setState({
        ws: new WebSocket("ws://localhost:7777")
      });
    };
  }

  render() {
    let { payload } = this.state;
    return (
      <React.Fragment>
        <Stream />
        <Title>Aot MetaData</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>CameraID</TableCell>
              <TableCell># of Persons</TableCell>
              <TableCell align="right">Time Stamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payload.map(row => (
              <React.Fragment>
                <TableRow key={Math.random()}>
                  <TableCell>{row.Camera_Id}</TableCell>
                  <TableCell>{row.num_person}</TableCell>
                  <TableCell align="right">{row.Timestamp}</TableCell>
                </TableRow>
                {row.Activity.map((activityData, i) =>
                  activityData.map(activity => (
                    <React.Fragment>
                      <TableRow key={Math.random()}>
                        <TableCell>
                          Person {i + ": "}
                          {activity.CONDITION}
                        </TableCell>
                        <TableCell>
                          {" "}
                          Person {i + ": "}
                          {activity.Confidence}
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default Payload;
