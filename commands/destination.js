import axios from 'axios'

export default async (event) => {
  const destination = event.message.text.replace('!destination ', '')
  try {
    console.log(destination)
    const results = []
    const { data } = await axios.get('https://data.taipei/api/v1/dataset/04a9e3ca-9d96-4f2a-aaef-ead33af206e5?scope=resourceAquire')
    for (const Route of data.result.results) {
      if (Route.免費接駁車路線 === destination) {
        results.push(Route.車站)
        if (results.length >= 5) {
          break
        }
      }
    }
    // event.reply(results)
    console.log(results)
    if (results.length > 0) {
      event.reply(results)
    } else {
      event.reply('找不到')
    }
  } catch (error) {
    event.reply('錯誤')
  }
}
