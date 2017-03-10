const Botkit = require('botkit');

if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

const controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: process.env.token
}).startRTM(function(err){
    if (err) {
        throw new Error(err);
    }
});

// say hi
controller.hears('hi',['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,'hi');
});

// say omikuji
controller.hears('omikuji',['direct_message','direct_mention','mention'],function(bot,message) {

    // 配列
    var records = [ "大吉", "中吉", "吉", "凶" ] ;

    // 配列からランダムで値を選択
    var result = records[ Math.floor( Math.random() * records.length ) ] ;

    bot.reply(message, result);
});