const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * @author lnden
 * @name base64 to src
 */
const fsm = wx.getFileSystemManager();
const FILE_BASE_NAME = 'tmp_base64src';
const base64src = (base64data) => {
  return new Promise((resolve, reject) => {
    const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.jpg`;
    const buffer = wx.base64ToArrayBuffer(base64data);
    fsm.writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',
      success() {
        resolve(filePath);
      },
      fail() {
        reject(new Error('ERROR_BASE64SRC_WRITE'));
      },
    });
  });
};

/**
 * @author lnden
 * @name 元转换为分
 */
const regYuanToFen = (yuan, digit) => {
  var m = 0,
    s1 = yuan.toString(),
    s2 = digit.toString();
  try {
    m += s1.split(".")[1].length
  } catch (e) {}
  try {
    m += s2.split(".")[1].length
  } catch (e) {}
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
};

/**
 * @author lnden
 * @name 支付获取随机数
 */
const randomNum = () => {
  let getTime = new Date().getTime().toString();
  let random = Math.floor(Math.random() * 1000000000000000);
  return getTime + random
};

module.exports = {
  formatTime: formatTime,
  base64src: base64src,
  regYuanToFen: regYuanToFen,
  randomNum: randomNum
}