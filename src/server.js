import "./db.js";
import { app } from "./app.js";
import cluster from "cluster";
import os from "os";
import minimist from "minimist";
import { logger } from "./utils/logger.util.js";

const arg = minimist(process.argv.slice(2));
logger.info(arg);

const PORT = parseInt(process.argv[2]) || 8081;

const modoCluster = process.argv[3] === "CLUSTER";
const numCPUs = os.cpus().length;

if (modoCluster && cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    // Create a worker
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    logger.info(`worker ${worker.process.pid} died`);
  });
} else {
  const PORT = parseInt(process.argv[2]) || 8081;

  app.get("/cluster", (req, res) => {
    res.send("Welcome from cluster configuration");
  });

  app.listen(PORT, () =>
    logger.info(`Server started on port ${PORT} - PID WORKER ${process.pid} `)
  );
}


export { arg, PORT };