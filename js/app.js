$("#name").focus();

const $name = $("#name");
const $email = $("#mail");
const $design = $("#design");
const selectThemeOption = $("#design").children()[0];
const jsPuns = $("#design").children()[1];
const heartJs = $("#design").children()[2];
const colorChildren = $("#color").children();
const activities = $(".activities");
const checkboxes = $(":checkbox");
console.log(checkboxes);

let startingCost = 0;
$("button").click(e => {
  e.preventDefault();
  console.log($name.val());
  console.log($email.val());
});

$("#removeOption:selected").val([]);
$("#removeOption:selected").css("display", "none");
$("#design").on("change", e => {
  //need to find a way to make sure first click is one or the other design
  if (e.target.value === "js puns") {
    // show correct colors for "heart js"
    colorChildren.each(function(i) {
      if (i < 3) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
    // AND pick one as a default selection
    $("#color").val("cornflowerblue");
  }
  if (e.target.value === "heart js") {
    //load correct color for heart js
    // show correct colors for "heart js"
    colorChildren.each(function(i) {
      if (i > 2) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
    // AND pick one as a default selection
    $("#color").val("tomato");
  }
});

activities.append('<span id="total">$0</span>');

$(activities).change(e => {
  //To get dollar sign
  let activityString = $(e.target)
    .parent()
    .text();
  const indexOfDollarSign = activityString.indexOf("$");
  let price = parseFloat(activityString.slice(indexOfDollarSign + 1));
  //To get Date and time of event
  const indexOfDash = activityString.indexOf("—");
  const indexOfComa = activityString.indexOf(",");
  const dateAndTime = activityString.slice(indexOfDash, indexOfComa);

  if (e.target.checked === true) {
    startingCost = startingCost + price;
  } else if (e.target.checked === false) {
    startingCost = startingCost - price;
  }
  $("#total").text(`$${startingCost}`);

  console.log(activityString); //gives me the whole string
  console.log(dateAndTime); //gives me the part of the string where its the day and time of event
  if (activityString.includes(dateAndTime)) {
    console.log(true);
  } else {
    console.log(false);
  }
  for (let i = 0; i < checkboxes.length; i++) {
    console.log();
  }
});

//Find a way to make sure user cant check events that have the same time.
//If an event has the same time frame, disable checkbox and line through

//create the value for each check box and then add it to the page
//Cant check boxes if time interferes with selected checkbox
