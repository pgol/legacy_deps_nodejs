const TripService = require("./TripService");
const assert = require("assert");
const User = require("./User");
const Trip = require("./Trip");

const GUEST = null;
const REGISTERED_USER = new User();
const ANOTHER_USER = new User();
const TO_GIB = new Trip("Gibraltar");
let loggedInUser;

describe("TripService", function() {
    it("should throw an error when user is not logged in", function() {
        assert.throws(() => {
            const tripService = new TestableTripService();
            const UNUSED_USER = null;
            loggedInUser = GUEST;
            tripService.getTripsByUser(UNUSED_USER);
        }, /User not logged in/);

    });

    it("should return no trips when users are not friends", function() {
        const tripService = new TestableTripService();
        const NOT_FRIEND = new User();
        NOT_FRIEND.addTrip(TO_GIB);
        NOT_FRIEND.addFriend(ANOTHER_USER);
        loggedInUser = REGISTERED_USER;

        const trips = tripService.getTripsByUser(NOT_FRIEND);

        assert.deepStrictEqual(trips, []);
    });

    class TestableTripService extends TripService {
        getLoggedInUser() {
            return loggedInUser;
        }

    }
});