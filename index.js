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

// say tenki
controller.hears('tenki',['direct_message','direct_mention','mention'],function(bot,message) {

    let http = require('http');
    const URL = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=050010';

    http.get(URL, (res) => {
        let body = '';
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', (res) => {
            res = JSON.parse(body);
      
            bot.reply(message, res.description.text);
            //console.log(res);
        });
    }).on('error', (e) => {
        console.log(e.message); //エラー時
    });
});

// say uranai
controller.hears('uranai',['direct_message','direct_mention','mention'],function(bot,message) {
    var moment = require('moment');
    var today = moment().format("YYYY/MM/DD");
    var uri = 'http://api.jugemkey.jp/api/horoscope/free/' + today;

    console.log(uri);

    let http = require('http');
    const URL = uri;

    http.get(URL, (res) => {
        let body = '';
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', (res) => {
            res = JSON.parse(body);

            for(var value of res.horoscope[today]){
              console.log(value.sign);
              console.log(value.content);
             }

            bot.reply(message, res.horoscope[today][0].content);
        });
    }).on('error', (e) => {
        console.log(e.message); //エラー時
    });
});

