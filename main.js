// Initialize Firebase
var config = {
  apiKey: "AIzaSyCBWMFIeBeUSc1wRrp8_JJ7ME29-Qo0Ivo",
  authDomain: "timesheet-77e67.firebaseapp.com",
  databaseURL: "https://timesheet-77e67.firebaseio.com",
  projectId: "timesheet-77e67",
  storageBucket: "timesheet-77e67.appspot.com",
  messagingSenderId: "900015543508"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function() {
  $("#add-employee").on("click", function(event) {
    event.preventDefault();

    var name = $("#name-input")
      .val()
      .trim();
    var role = $("#role-input")
      .val()
      .trim();
    var startDate = $("#date-input")
      .val()
      .trim();
    var monthlyRate = $("#rate-input")
      .val()
      .trim();

    database.ref().push({
      name: name,
      role: role,
      startDate: startDate,
      monthlyRate: monthlyRate,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

  database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
    var sv = snapshot.val();
    var nameTh = $("<th>").attr("scope", "row").text(sv.name);
    var roleTd = $("<td>").text(sv.role);
    var startDateTd = $("<td>").text(sv.startDate);
    var monthsWorked = moment.duration(moment().diff(moment(sv.startDate, "MM/DD/YYYY"))).asMonths();

    var monthsWorkedTd = $("<td>").text(parseInt(monthsWorked));
    var monthlyRateTd = $("<td>").text(sv.monthlyRate);
    var totalBilledTd = $("<td>");

    var tr = $("<tr>").append(nameTh, roleTd, startDateTd, monthsWorkedTd, monthlyRateTd, totalBilledTd);
    $("#employees").append(tr);

  });
});

