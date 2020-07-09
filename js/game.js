const numDivs = 36;
const maxHits = 11;
let divSelector = undefined;
let prevDivSelector = undefined;
let hits = 1;
let firstHitTime;
let misses=0;
let p;


function round() {

  if (hits === maxHits) {
    endGame();
  }

  if(divSelector!==undefined) {
    $(divSelector).removeClass("target");
    $(divSelector+" p").removeClass("target");
    $(divSelector+" p").empty();
  }
  else {
    firstHitTime = getTimestamp();
  }

  divSelector = randomDivId();

  if (hits !== maxHits){
    checkDuplicateSelector(prevDivSelector, divSelector);
  }

  prevDivSelector = divSelector;

}


function checkDuplicateSelector(prevDivSelector, divSelector) {
  if (prevDivSelector===divSelector){
    divSelector = randomDivId();
    checkDuplicateSelector(prevDivSelector, divSelector);

  }
  else{
    $(divSelector).addClass("target");
    $(divSelector+" p").addClass("target");
    $(divSelector+" p").text(hits);
  }
}


function endGame() {
  $(".game-deck").hide();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#misses-count").text(misses);

  $("#win-message").show();
  $("#button-reload").show();
}

function handleClick(event) {
  console.log()
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }
  else {
    $(event.target).addClass("miss");
    p = $(this).children();
    p.text("ПРОМАХ!");

    setTimeout(function(){
      $(event.target).removeClass("miss");
      p.empty();
    }, 200);
    misses++;
  }
}

function init() {



  $("#button-start").click(function () {
      round();
      $("#button-start").hide();
      $(".game-field").click(handleClick);
  });

  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
