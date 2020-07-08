const numDivs = 36;
const maxHits = 11;
let divSelector = undefined;
let prevDivSelector = undefined;
let hits = 1;
let firstHitTime;
let misses=0;


function round() {

  if (hits === maxHits) {
    endGame();
  }

  if(divSelector!==undefined) {
    $(divSelector).removeClass("target").empty();
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


function checkDuplicateSelector(prev, next) {
  if (prev===next){
    divSelector = randomDivId();
    checkDuplicateSelector();

  }
  else{
    $(divSelector).addClass("target").text(hits);
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
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  else {
    $(event.target).addClass("miss");
    $(event.target).text("ПРОМАХ");
    setTimeout(function(){ $(event.target).removeClass("miss").empty(); }, 1000);
    misses++;
  }
}

function init() {



  $("#button-start").click(function () {
      round();
      $("#button-start").hide();
  });
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
