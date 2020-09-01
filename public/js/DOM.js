
function render() {
  if (scoring.elementList.length > 0) {
    $(".remove, .total, .range-field").removeClass("hide");
    if (scoring.comboElements.length > 0) {
      $(".input-field label").text("Combo Element")
      $(".input-field input").attr("disabled", false)
    }
    else { $(".input-field input").attr("disabled", true) }
  } else {
    $(".remove, .total, .range-field").addClass("hide");
    $(".input-field input").attr("disabled", false);
    $(".input-field label").text("Element");
  }
  let currentElement = scoring.currentElement;
  $("#scoringElementList div").addClass("hide").removeClass("on").children("p").text("")
  $("#scoringElementList div").eq(scoring.currentElement.index).addClass("on");
  scoring.elementList.forEach(e => {
    let div = $("#scoringElementList div").eq(e.index).removeClass("hide")
    div.children(".name").text(e.name)
    div.children(".currentCode").text(e.currentCode)
    div.children(".currentScore").text(e.currentScore.toFixed(2))
  })
  $(".selectors > div").addClass('hide')
  $("#goeSlider").val(scoring.goe)
  if (scoring.elementList.length > 0) {
    $(".totalCode").text(scoring.code())
    if (scoring.goe > 0) { $(".goe").text("GOE: +" + scoring.goe) } else { $(".goe").text("GOE: " + scoring.goe) }
    $(".totalScore").text(scoring.score())
  } else {
    $(".total p").text("")
  }
  if (currentElement) {
    if (currentElement.rotations.length) { $(".rotation-selector").removeClass("hide") }
    if (currentElement.modifiers.length) { $(".modifier-selector").removeClass("hide") }
    if (currentElement.levels.length) { $(".level-selector").removeClass("hide") }
    $(".rotation-selector .btn").updateButtons(currentElement.rotations).removeClass("on").each(function () {
      if ($(this).text() == currentElement.currentRotations) { $(this).addClass("on") }
    })
    $(".level-selector .btn").updateButtons(currentElement.levels).removeClass("on").each(function () {
      if ($(this).text() == currentElement.currentLevel) { $(this).addClass("on") }
    })
    $(".modifier-selector .btn").updateButtons(currentElement.modifiers).removeClass("on").each(function () {
      if (currentElement.currentMods.includes($(this).text())) { $(this).addClass("on") }
    })
  }
}

$(() => {

  console.log('ready');

  $.fn.updateButtons = function (arr) {
    let ar = arr.map(e => e.toString())
    return $(this).each(function (e) {
      let text = $(this).text();
      if (ar.includes(text)) {
        $(this).removeClass("hide")
      }
      else {

        $(this).addClass("hide")
      }
    }
    )
  }

  $(".sidenav").sidenav();

  $("#scoringElementInputField").change(function (e) {
    let input = $(this).val(); //get input field value
    scoring.addElement(input);
    render();
    $(this).val("");
    $(this).blur();
  }
  )

  $("#clear").click(function () {
    scoring.clear();
    render();
  })
  $("#scoringElementList").on("click", "div", function () {
    let index = $(this).index()
    scoring.changeCurrentElement(index)
    render();
  })

  $(".rotation-selector").on("click", ".btn", function () {
    console.log($(this).text())
    scoring.updateRotations($(this).text())
    render();
  })
  $(".level-selector").on("click", ".btn", function () {
    console.log($(this).text())
    scoring.updateLevel($(this).text())
    render();
  })
  $(".modifier-selector").on("click", ".btn", function () {
    console.log($(this).text())
    scoring.updateMods($(this).text())
    render();
  })

  $("#goeSlider").change(function () {
    scoring.updateGOE(parseInt($(this).val()))
    render();
  })
  $(".remove").click(function () {
    scoring.removeElement();
    render();
  })



  // nav selector

  $("nav, .sidenav").on("click", "li", function (event) {
    console.log($(this).text())
    let nav = $(this).text();
    $("#navTitle").text(nav)
    $("#nav-mobile li").removeClass("active")
    switch (nav) {

      case "Add Student":
        $(".navAdd").addClass("active")
        console.log('Show Add Student')
        $("#add").show();
        $("#add").siblings().hide();
        break;

      case "Students":
        $(".navStudents").addClass("active")
        console.log('Show Student List')
        $("#students").show();
        $("#students").siblings().hide();
        break;

      case "Scoring":
        $(".navScoring").addClass("active")
        console.log('Show Scoring');
        $("#scoring").show();
        $("#scoring").siblings().hide();
        break;

      case "Program Builder":
        $(".navProgramBuilder").addClass("active")
        console.log('Show Program Builder');
        $('#programBuilder').show();
        $('#programBuilder').siblings().hide();
        break;

      default:
        console.log('not found')

    }
    $(".sidenav").sidenav("close")
  })

  $("#programElementEntry").change(function (event) {
    let input = $(this).val();
    console.log(input);
    let element = buildNewElement(input);
    let listItem = `<a href="#!" class="collection-item">${element.currentCode}: ${element.currentScore}<i class="secondary-content material-icons destroy">close</i></a>`
    $(".collection").append(listItem);
  })
  $(".collection").on("click", ".collection-item", function () {
    console.log("clicked")
    $(this).siblings().removeClass("active")
    $(this).addClass('active')
  })
  $(".collection").on("click", ".destroy", function () {
    console.log("clicked X")
    $(this).parent().remove();
  })



  buildElements(sovData);
  scoring = new Scoring();
  $("#scoring").show()
});

