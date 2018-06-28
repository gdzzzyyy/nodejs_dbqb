const axios = require('axios');
const gmurl = "https://dbqb.maydaygame.cn/weapp/";
const header_cfg = { 'Content-Length': 0, 'Content-Type': 'text/plain' };

async function http_post(name, post_obj) {
  let result = null;
  try {
    result = await axios({
      url: gmurl + name,
      method: 'POST',
      headers: header_cfg,
      data: post_obj,
    }).then(res => {
      return res.data;
    });
  }
  catch (err) {
    let code = -1;
    if (err != null && err.response != null) {
      code = err.response.status || code;
    }
    return { code: code };
  }
  return result;
}

async function start_robot(uid) {
  let login = await http_post("login_dev", { 'uid': uid });
  if (login.code != 0) {
    console.log('login fail, code:', login.code);
    return;
  }

  let battle_start = await http_post("battle_start", { 'sid': login.data.sid, 'stage_id': 4001 });
  if (battle_start.code != 0) {
    console.log('battle start fail, code:', battle_start.code);
    return;
  }
}

let sleep = function (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, time)
  })
}

async function main() {
  for (let i = 1; i < 100; ++i) {
    start_robot(Math.floor(Math.random() * 100000));
    await sleep(100);
  }
  await sleep(10);
}

main();