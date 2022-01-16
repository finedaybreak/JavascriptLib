/**
 * 订阅通知类 拥有debug能力
 */
class EventBus {
  /**
   * @param {Boolean} mode 可以开启 debug模式
   */
  constructor(debug = false) {
    this._subs = [];
    this._debug = debug || false;
  }
  /**
   * 发布消息
   * @param {String} channel
   * @param {any} data
   */
  pub(channel, data) {
    if (this._debug)
      console.log(`EventBus pub | channel: ${channel} | data: `, data);
    const readys = this._subs.filter((sub) => sub.channel === channel);
    readys.map((sub) => sub.cb(data));
    readys.map((sub) => (sub.onece ? (sub.onece = undefined) : undefined));
    this._subs = this._subs.filter(
      (sub) =>  sub.onece !== undefined
    );
  }
  /**
   * 订阅一次消息
   * @param {String} channel
   * @param {(any)=>void} cb 接受消息回调函数
   */
  subOne(channel, cb) {
    if (this._debug)
      console.log(`EventBus subOne | channel: ${channel} | cb: `, cb);
    const targetIndex = this.findOneSubIndex(channel, cb);
    if (targetIndex !== -1) {
      console.warn(`EventBus 重复订阅 | channel: ${channel}`);
      return;
    }
    this._subs.push({ channel, cb, onece: true });
  }
  /**
   * 持续订阅消息
   * @param {String} channel
   * @param {(any)=>void} cb 接受消息回调函数
   */
  sub(channel, cb) {
    if (this._debug)
      console.log(`EventBus sub | channel: ${channel} | cb: `, cb);
    const targetIndex = this.findOneSubIndex(channel, cb);
    if (targetIndex !== -1) {
      console.warn(`EventBus 重复订阅 | channel: ${channel}`);
      return;
    }
    this._subs.push({ channel, cb, onece: false });
  }
  /**
   * 销毁消息管道
   * @param {String} channel
   */
  destroyChannel(channel) {
    if (this._debug) console.log(`EventBus destroy | channel: ${channel}`);
    this._subs = this._subs.filter((sub) => sub.channel !== channel);
  }

  findOneSubIndex(channel, cb) {
    return this._subs.findIndex(
      (sub) => sub.channel === channel && sub.cb === cb
    );
  }
  /**
   * 取消订阅
   * @param {String} channel
   * @param {(any)=>void} cb 接受消息回调函数
   */
  unsub(channel, cb) {
    if (this._debug)
      console.log(`EventBus unsub | channel: ${channel} | cb: `, cb);
    const targetIndex = this.findOneSubIndex(channel, cb);
    if (targetIndex !== -1) {
      this._subs.splice(targetIndex, 1);
      return true;
    }
    return false;
  }
  /**
   * 清空订阅者
   */
  emptySubs() {
    if (this._debug) console.log(`EventBus emptySubs`);
    this._subs = [];
  }
}

module.exports = EventBus;
