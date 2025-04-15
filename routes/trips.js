var express = require("express");
var router = express.Router();
var moment = require("moment");

const Trip = require("../models/trips");

function cleanCityName(cityName) {
  return cityName[0].toUpperCase() + cityName.slice(1).toLowerCase();
}
/* GET home page. */
router.get("/", function (req, res) {
  // Prepare params:
  //TODO: add checkBody() and condition
  let { departure, arrival, date } = req.body;
  departure = cleanCityName(departure);
  arrival = cleanCityName(arrival);
  startDate = moment(date).startOf("day");
  endDate = startDate.clone().add(1, "day");

  // Fetch matching trips
  Trip.find({
    departure: departure,
    arrival: arrival,
    date: { $gte: startDate, $lt: endDate },
  }).then((data) => {
    console.log(`Fetched ${data.length} trips matching params`);

    if (data.length === 0) {
      // If no trips found
      res.json({
        result: false,
        message: `${data.length} matching trips found`,
        trips: data,
      });
    } else {
      // Trips found, youpi!
      res.json({
        result: true,
        message: `${data.length} matching trips found`,
        trips: data,
      });
    }
  });
});

module.exports = router;
