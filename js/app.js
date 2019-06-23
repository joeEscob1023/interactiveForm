$("#name").focus();

const $name = $("#name");
const $email = $("#mail");
const $design = $("#design");
const selectThemeOption = $("#design").children()[0];
const jsPuns = $("#design").children()[1];
const heartJs = $("#design").children()[2];
const colorChildren = $("#color").children();
const activities = $(".activities");
const activityInputs = activities.children();
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
$(activities).append(0);

$(activities).change(e => {
  let inputs = $(e.target)
    .parent()
    .text();
  const indexOfDollarSign = inputs.indexOf("$");
  let price = parseFloat(inputs.slice(indexOfDollarSign + 1));

  if (e.target.checked === true) {
    startingCost = startingCost + price;
  } else if (e.target.checked === false) {
    startingCost = startingCost - price;
  }
  $(activities).append(startingCost);
});

// $(activities).change(e => {
//   let inputs = $(e.target)
//     .parent()
//     .text();
//   const indexOfDollarSign = inputs.indexOf("$");
//   let price = parseFloat(inputs.slice(indexOfDollarSign + 1));
//   let totalCost = (startingCost += price);
// });
//create the value for each check box and then add it to the page
//Cant check boxes if time interferes with selected checkbox
