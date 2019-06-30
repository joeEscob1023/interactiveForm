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
console.log("TCL: checkboxes", checkboxes);

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

let chosenArr = [];
$(checkboxes).change(e => {
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
  let parsedDate = dateAndTime.split(/\s+/);
  parsedDate = parsedDate.join(" ");
  console.log(" parsedDate", parsedDate);

  if (e.target.checked === true) {
    startingCost = startingCost + price;
  } else if (e.target.checked === false) {
    startingCost = startingCost - price;
  }
  $("#total").text(`$${startingCost}`);

  // if ($(this).is(":checked") === true) {
  //   console.log(this);
  //   let index = chosenArr.indexOf(parsedDate);
  //   console.log(index);
  //   if (index > -1) {
  //     chosenArr.splice(index, 1);
  //     console.log(chosenArr);
  //   }
  //   return;
  // }

  /*
  This is return true if the strings share the same day and time, but only if the second box is clicked, i cant figure out how to use a for loop to see if a check box is clicked, to loop through all of the other inputs and if it has the same day and time, to disable it and put a line through.

  The code below doesnt work. it will respond true in the console, but it wont run the css code for whatever reason.

  I've tried a few things and I still cant get it to work.

  */

  for (let i = 0; i < checkboxes.length; i++) {
    //Loop through checkboxes with checkboxes[i]
    //see if the selected checkbox contains the day and time
    //if other checkbox texts contain selected day and time, disable and use css to add a line through <label> and <input>
    /*
    ex: if user selects activity with day Tuesday and time 9am-12pm
    all other events with the time 9am-12pm on a Tuesday need to be disabled and put a line through.
    */
  }

  /*
  bottom code needs to go somewhere in loop to compare date.
  It also needs another condition (&&) to run the condition correctly, I just dont know what it is yet.

  Here is the study guide I'm using my issue starts on page 5.

  https://drive.google.com/file/d/1Vw658-9KUiUZ5yHaABvkytC9W2QBYiW_/view
  */

  //UPDATE: I can disable the selected event, but thats not really what I want :(
  if ($(e.target).is(":checked") === true) {
    $(e.target).prop("disabled", true);
  }
  // if (chosenArr.includes(parsedDate)) {
  //   console.log(true);
  //   return;
  // } else {
  //   console.log(false);
  // }

  // chosenArr.push(parsedDate);
  // console.log(chosenArr);
  // console.log(parsedDate);
});
