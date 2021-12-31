// 讀取 .env 變數
import 'dotenv/config'
// 引用 linebot 套件
import linebot from 'linebot'
// 引用執行 data.js
// import './data.js'
import bus from './commands/bus.js'
import destination from './commands/destination.js'
// 設定機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})

bot.on('message', async (event) => {
  if (event.message.type === 'text') {
    if (event.message.text.startsWith('!station ')) {
      bus(event)
    } else if (event.message.text.startsWith('!destination ')) {
      destination(event)
    } else if (event.message.text === '使用說明') {
      event.reply('Hello😊 \n歡迎使用台北市接駁車查詢機器人🚍 \n以下為您提供兩種查詢方式: \n\n📌方法1:\r輸入 !station (空格) + 捷運站名稱，範例:"!station 北投站"；將回復您至多5個可搭乘的接駁車路線。 \n\n📌方法2:\r輸入 !destination (空格) + 目的地名稱，範例:"!destination 水都溫泉館"。 \n如果該地點有接駁車且可在捷運站附近搭乘，機器人將回復您捷運站名稱。 \n\n💡若使用方法1，沒有回復您預期的地點，建議接著使用方法2查詢。')
    }
  }
})
