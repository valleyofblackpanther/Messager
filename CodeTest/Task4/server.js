 async function runCron() {
    let data = []
    for (let i = 0; i < 100; i++) {
      let record = {
        name: faker.name.findName(),
        email: faker.internet.email()
      }
      data.push(record)
    }
 }

 module.exports = {runCron}