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
const labelForActivities = $(activities).children()[1];
const otherJob = $("#other-title");
otherJob.hide();
$(labelForActivities).attr("for", "activities");

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

function invalidSpans(text, label) {
  const inputLabel = $(`label[for='${label}']`);
  const invalidSpan = `<span class='invalid'>${text}</span>`;
  inputLabel.append(invalidSpan);
  $(".invalid").css("color", "red");
  $(".invalid").show();
  setTimeout(function() {
    $(".invalid").remove();
  }, 5000);
}

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

/*
  I have my functions, now i just have to put it together,
  I'm not so sure how I am going to do that or where to implement my validator functions
*/

$('button[type="submit"]').on("click", e => {
  let success = true;
  success *= isValidName();
  success *= isValidEmail();
  success *= isValidActivity();
  success *= isValidCreditCard();
  success *= isValidZipCode();
  success *= isValidCvv();

  if (!success) {
    e.preventDefault();
  }
});

//Validation functions
const isValidName = () => {
  let result = /([a-z])\w+/i.test($("#name").val());

  if (!result) {
    invalidSpans(":Enter A Valid Name", "name");
  }
  return result;
};

function isValidEmail() {
  let result = /^[^@]+@[^@.]+\.[a-z]+$/i.test($("#mail").val());
  if (!result) {
    invalidSpans(":Enter A Valid Email", "mail");
  }
  return result;
}

function isValidActivity() {
  if ($("form input:checkbox:checked").length > 0) {
    return true;
  } else {
    invalidSpans(":Enter Atleast One Activity", "activities");
    return false;
  }
}

function isValidCreditCard() {
  if ($("#payment").val() === "credid card") {
    let result = /^\d{13,16}$/.test($("#cc-num").val());
    if (!result) {
      invalidSpans(":Enter A Valid CC number", "cc-num");
    } else {
      return true;
    }
    return false;
  }
  return true;
}

function isValidZipCode() {
  if ($("#payment").val() === "credit card") {
    let result = /^\d{5}$/.test($("#zip").val());
    if (!result) {
      invalidSpans(":Enter A Valid Zip", "zip");
      return false;
    } else {
      return true;
    }
  }
  return true;
}

function isValidCvv() {
  if ($("#payment").val() === "credid card") {
    let result = /^[0-9]{3,4}$/.test($("#cvv").val());
    if (!result) {
      invalidSpans(": Enter A Valid CVV", "cvv");
      return false;
    } else {
      return true;
    }
  }
  return true;
}
