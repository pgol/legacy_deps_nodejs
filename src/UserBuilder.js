const User = require("./User");
module.exports = function user({friends, trips}) {
    const user = new User();
    friends.forEach(user.addFriend, user);
    trips.forEach(user.addTrip, user);
    return user;
}
