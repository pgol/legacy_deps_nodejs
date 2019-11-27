const TripService = require("./TripService");
const assert = require("assert");
const User = require("./User");
const Trip = require("./Trip");

const GUEST = null;
const REGISTERED_USER = new User();
const ANOTHER_USER = new User();
const TO_GIB = new Trip("Gibraltar");
const TO_LONDON = new Trip("London");
let loggedInUser;
let tripService;

describe("TripService", function() {
    beforeEach(() => {
        tripService = new TestableTripService();
    });

    it("should throw an error when user is not logged in", function() {
        assert.throws(() => {
            const UNUSED_USER = null;
            loggedInUser = GUEST;
            tripService.getTripsByUser(UNUSED_USER);
        }, /User not logged in/);

    });

    it("should return no trips when users are not friends", function() {
        const NOT_FRIEND = new User();
        NOT_FRIEND.addTrip(TO_GIB);
        NOT_FRIEND.addFriend(ANOTHER_USER);
        loggedInUser = REGISTERED_USER;

        const trips = tripService.getTripsByUser(NOT_FRIEND);

        assert.deepStrictEqual(trips, []);
    });

    it("should return friends trips when users are friends", function() {
        loggedInUser = REGISTERED_USER;
        const friend = new User();
        friend.addFriend(loggedInUser);
        friend.addFriend(ANOTHER_USER);
        friend.addTrip(TO_GIB);
        friend.addTrip(TO_LONDON);

        const friendTrips = tripService.getTripsByUser(friend);

        assert.deepStrictEqual(friendTrips, [TO_GIB, TO_LONDON]);
    });

    class TestableTripService extends TripService {
        getLoggedInUser() {
            return loggedInUser;
        }

        tripsBy(user) {
            return user.getTrips();
        }

    }
});