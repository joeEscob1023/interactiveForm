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
    $("#color:selected").val([]);
    console.log("jspuns");
    //load correct color for js puns
    for (let i = 3; i < colorChildren.length; i++) {
      const hiddenShirts = colorChildren[i];
      $(hiddenShirts).hide();
    }
  }
  if (e.target.value === "heart js") {
    console.log("heart js");
    //load correct color for js puns
    for (let i = 0; i < colorChildren.length; i++) {
      const showShirts = colorChildren[i];
      if (i > 2) {
        $("#color:selected").val([]);
        $(showShirts).show();
      } else {
        $(showShirts).hide();
      }
    }
  }
});
