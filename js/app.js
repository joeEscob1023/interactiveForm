$("#name").focus();

const $name = $("#name");
const $email = $("#mail");
const $design = $("#design");
const selectThemeOption = $("#design").children()[0];
const jsPuns = $("#design").children()[1];
const heartJs = $("#design").children()[2];
const colorChildren = $("#color").children();
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
    console.log("jspuns");
    //load correct color for js puns
    for (let i = 0; i < colorChildren.length; i++) {
      if (i <= 2) {
        $(colorChildren[i]).show();
      }
      if (i > 2) {
        $(colorChildren[i]).hide();
      }
    }
  }
  if (e.target.value === "heart js") {
    //find way to make Cornflower Blue for JS PUNS options go away if heart js is clicked as the design option.
    console.log("heart js");
    //load correct color for heart js
    for (let i = 0; i < colorChildren.length; i++) {
      if (i > 2) {
        $(colorChildren[i]).show();
      }
      if (i <= 2) {
        $(colorChildren[i]).hide();
      }
    }
  }
});
