import { spawn } from "child_process";

export async function predictEmotion(req, res) {
  console.log("trying to run script");

  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn("python", ["./server/emotionPredictor/script.py"]);
  // collect data from script
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    console.log(dataToSend);
    // send data to browser
    res.send(dataToSend);
  });
}
