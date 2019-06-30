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
  console.log("TCL: parsedDate", parsedDate);

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
  if (chosenArr.includes(parsedDate)) {
    if (true) {
      $(e.target).css("text-decoration", "line-through");
    }
    return;
  }

  chosenArr.push(parsedDate);
});

//Find a way to make sure user cant check events that have the same time.
//If an event has the same time frame, disable checkbox and line through

//create the value for each check box and then add it to the page
//Cant check boxes if time interferes with selected checkbox
