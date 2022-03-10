const cron = require("node-cron")
const { runCron } = require('./server')


cron.schedule("* * * * * *", () => {
    console.log("Running the cron....");
    runCron();
  })