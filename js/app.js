$("#name").focus();

const $name = $("#name");
const $email = $("#mail");
const selectThemeOption = $("#design").children()[0];
const jsPuns = $("#design").children()[1];
const heartJs = $("#design").children()[2];
$("button").click(e => {
  e.preventDefault();
  console.log($name.val());
  console.log($email.val());
});
$(selectThemeOption).hide();

$("#design").click(() => {
  //Get the value of each theme on click.
  const val = $("#design").val();
  console.log(val);
});
