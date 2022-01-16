const EventBus = require("./event-bus");

const bus = new EventBus(true);

function subone(data) {
  console.log("Sub One ---->", data);
}
function submore(data) {
  console.log("Sub More ---->", data);
}

bus.sub("sub-one", submore);

bus.subOne("sub-one", subone);

bus.pub("sub-one", "hello guys one");

bus.pub("sub-one", "hello guys two");

bus.pub("sub-one", "hello guys three");
