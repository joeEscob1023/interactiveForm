$("#name").focus();

const name = $("#name")[0];
const email = $("#mail");
const design = $("#design");
const selectThemeOption = $("#design").children()[0];
const jsPuns = $("#design").children()[1];
const heartJs = $("#design").children()[2];
const colorChildren = $("#color").children();
const activities = $(".activities");
const checkboxes = $(":checkbox");
const labelText = checkboxes.parent().text();
console.log(name);

let startingCost = 0;

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
  console.log(startingCost);

  for (let i = 0; i < checkboxes.length; i++) {
    if (
      checkboxes[i] !== e.target &&
      checkboxes[i].parentNode.innerText.includes(parsedDate)
    ) {
      if ($(e.target).is(":checked") === true) {
        $(checkboxes[i])
          .parent()
          .css("text-decoration", "line-through");
        $(checkboxes[i]).attr("disabled", true);
      } else {
        $(checkboxes[i])
          .parent()
          .css("text-decoration", "none");
        $(checkboxes[i]).attr("disabled", false);
      }
    }
  }
});

const selectMethod = $('#payment option[value="select_method"]').val([]);
const creditCard = $("#payment select")[1];
const paypal = $("#credit-card").next();
const bitCoin = $("#credit-card")
  .next()
  .next();
selectMethod.css("display", "none");

$("#payment").on("change", e => {
  if (e.target.value === "credit card") {
    $("#credit-card").show();
    $(paypal).hide();
    $(bitCoin).hide();
  } else if (e.target.value === "paypal") {
    $(paypal).show();
    $("#credit-card").hide();
    $(bitCoin).hide();
  } else if (e.target.value === "bitcoin") {
    $(bitCoin).show();
    $("#credit-card").hide();
    $(paypal).hide();
  } else {
    return;
  }
});

//Validation functions
function isValidName(name) {
  return /[^a-z]+$/.test(name);
}

function isValidEmail(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

function isValidActivity() {
  return startingCost != 0;
}

function isValidCreditCard(cardNumber) {
  return /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(
    cardNumber
  );
}

function isValidZipCode(zip) {
  return /[^\d](\d{5})[^\d]/g.test(zip);
}

function isValidCvv(cvv) {
  return /^[0-9]{3,4}$/.test(cvv);
}

/*
  I have my functions, now i just have to put it together,
  I'm not so sure how I am going to do that or where to implement my validator functions
*/

//I get an error 405 and it wont submit.
$("form").on("submit", e => {
  e.preventDefault();
  if ($(name).val() === "") {
    console.log("Please enter a name");
    $(name).prop("required", true);
    $(name).css("border", "solid red 1px");
  } else {
    console.log($(name).val());
  }
});
