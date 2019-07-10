$("#name").focus();

const name = $("#name");
const email = $("#mail");
const design = $("#design");
const selectThemeOption = $("#design").children()[0];
const jsPuns = $("#design").children()[1];
const heartJs = $("#design").children()[2];
const colorChildren = $("#color").children();
const activities = $(".activities");
const checkboxes = $(":checkbox");
const labelText = checkboxes.parent().text();
const labelForActivities = $(activities).children()[0];
$(labelForActivities).attr("for", "activities");
console.log(labelForActivities);

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
const isValidName = name => {
  return /([A-Z])\w+/g.test(name);
};

function isValidEmail(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

function isValidActivity() {
  return startingCost != 0;
}

function isValidCreditCard(cardNumber) {
  return /^(\d{4}[- ]){3}\d{4}|\d{16}$/g.test(cardNumber);
}

function isValidZipCode(zip) {
  return /^\d{5}(?:[-\s]\d{4})?$/g.test(zip);
}

function isValidCvv(cvv) {
  return /^[0-9]{3,4}$/.test(cvv);
}

function masterValidator(valid, input) {
  if (valid) {
    $(input).css("border", "solid green 2px");
    console.log(input);
  } else {
    $(input).css("border", "solid red 2px");
  }
}

function invalidSpans(text, label) {
  const inputLabel = $(`label[for='${label}']`);
  console.log(inputLabel);
  const invalidSpan = `<span class='invalid'>${text}</span>`;
  inputLabel.append(invalidSpan);
  $(".invalid").css("color", "red");
  $(".invalid").show();
  setTimeout(function() {
    $(".invalid").hide();
  }, 5000);
}

//invalid input spans

/*
  I have my functions, now i just have to put it together,
  I'm not so sure how I am going to do that or where to implement my validator functions
*/

$("form").on("submit", e => {
  e.preventDefault();
  let nameInput = $(name).val();
  let emailInput = $(email).val();
  let cardNumber = $("#cc-num").val();
  let zipCode = $("#zip").val();
  let cvv = $("#cvv").val();

  if (isValidName(nameInput)) {
    return nameInput;
  } else {
    invalidSpans(" :Please Enter A Name", "name");
  }

  if (isValidEmail(emailInput)) {
    return emailInput;
  } else {
    invalidSpans(" :Please Enter A Correct Email", "mail");
  }
  if (isValidActivity()) {
    return true;
  } else {
    invalidSpans("Please Enter Atleast One Activity", "activitites");
  }
  if (isValidName(nameInput)) {
    return nameInput;
  } else {
    invalidSpans("Please Enter A Name");
  }

  //Can be ignored. For Testing purposes
  console.log(isValidName(nameInput));
  console.log(isValidEmail(emailInput));
  console.log(isValidActivity(startingCost));
  console.log(isValidCreditCard(cardNumber));
  console.log(isValidZipCode(zipCode));
  console.log(isValidCvv(cvv));
});
