$(document).ready( function() {

  var tutorialIndexToPageObject = {}; //{0:{page:2,totalPageNum:5}}

  var setupTutorialHeader = function(tutorialIndex) {
    var tutorialPageObject = tutorialIndexToPageObject[tutorialIndex];
    var tutorialContainer = getTutorialContainer(tutorialIndex);
    var tutorialNavigationHeader = tutorialContainer.getElementsByClassName("tutorialNavigationHeader")[0];
    
    var previousLink = document.createElement("div");
      previousLink.className = "previousLinkContainer";
      previousLink.style.float = "left";
      previousLink.style.width = "20%";
      // previousLink.style.text-align = "left";
      previousLink.style.visibility = "hidden";

      var prevLink = document.createElement("a");
      $(prevLink).attr("href", "#");
      prevLink.className = "tutorialPreviousButton";
      prevLink.innerHTML = "Previous";

      previousLink.appendChild(prevLink);
      tutorialNavigationHeader.appendChild(previousLink);

      var countDiv = document.createElement("div");
      countDiv.style.float = "left";
      countDiv.style.width = "40%";
      countDiv.className = "countDiv";
      // countDiv.style.text-align = "center";

      var pageSpan = document.createElement("span");

      var currentSpan = document.createElement("span");
      currentSpan.className = "currentPageNum";
      currentSpan.innerHTML = -1;
      pageSpan.appendChild(currentSpan);

      var ofDiv = document.createElement("span");
      ofDiv.innerHTML = " of ";
      pageSpan.appendChild(ofDiv);

      var totalSpan = document.createElement("span");
      totalSpan.className = "totalPageNum";
      totalSpan.innerHTML = 5;

      pageSpan.appendChild(totalSpan);
      countDiv.appendChild(pageSpan);
      tutorialNavigationHeader.appendChild(countDiv);

      previousLink.appendChild(prevLink);
      tutorialNavigationHeader.appendChild(countDiv);

      var nextLink = document.createElement("div");
      nextLink.className = "nextLinkContainer";
      nextLink.style.float = "right";
      nextLink.style.width = "20%";
      // nextLink.style.text-align = "right";

      var nLink = document.createElement("a");
      $(nLink).attr("href", "#");
      nLink.className = "tutorialNextButton";
      nLink.innerHTML = "Next";

      nextLink.appendChild(nLink);
      tutorialNavigationHeader.appendChild(nextLink);

      var spacing = document.createElement("div");
      spacing.innerHTML = "<br/><hr/>"
      tutorialNavigationHeader.appendChild(spacing);

    var pageNumSpan = tutorialNavigationHeader.getElementsByClassName("currentPageNum")[0];
    var totalPageNumSpan = tutorialNavigationHeader.getElementsByClassName("totalPageNum")[0];
    pageNumSpan.innerHTML = tutorialPageObject.page + 1;
    totalPageNumSpan.innerHTML = tutorialPageObject.totalPageNum;

  }

  var updateTutorialHeader = function(tutorialIndex) {
    var tutorialPageObject = tutorialIndexToPageObject[tutorialIndex];
    var tutorialContainer = getTutorialContainer(tutorialIndex);
    var tutorialNavigationHeader = tutorialContainer.getElementsByClassName("tutorialNavigationHeader")[0];

    var pageNumSpan = tutorialNavigationHeader.getElementsByClassName("currentPageNum")[0];
    pageNumSpan.innerHTML = tutorialPageObject.page + 1;

    var previousLinkContainer = tutorialNavigationHeader.getElementsByClassName("previousLinkContainer")[0];
    
    if(tutorialPageObject.page == 0) {
      //hide previous link
      previousLinkContainer.style.visibility = "hidden";
    } else {
      previousLinkContainer.style.visibility = "visible";      
    }

    var nextLinkContainer = tutorialNavigationHeader.getElementsByClassName("nextLinkContainer")[0];
    if(tutorialPageObject.page + 1 < tutorialPageObject.totalPageNum) {      
      nextLinkContainer.style.visibility = "visible";
    } else {
      nextLinkContainer.style.visibility = "hidden";
    }
  }

  var setTutorialNextButtonVisibility = function(tutorialIndex, visibility) {
    var tutorialContainer = getTutorialContainer(tutorialIndex);
    console.log(tutorialContainer);
    // var nextButton = tutorialContainer.getElementsByClassName("tutorialNextButton")[0];
    var bigButton = tutorialContainer.getElementsByClassName("tutorialNextButton")[1];
    // nextButton.style.display = (visibility ? "block" : "none");
    bigButton.style.display = (visibility ? "block" : "none");
  }

  var updateTutorialPage = function(tutorialIndex) {
    var tutorialContainer = getTutorialContainer(tutorialIndex);
    var tutorialContentPages = tutorialContainer.getElementsByClassName("tutorialContentPage");
    for(var i=0;i<tutorialContentPages.length;i++) {
      tutorialContentPages[i].style.display = "none";
    }
    var currentPage = tutorialContentPages[tutorialIndexToPageObject[tutorialIndex].page];
    currentPage.style.display = "block";
    
    updateTutorialHeader(tutorialIndex)
  }

  var getTutorialContainer = function(tutorialIndex) {
    var tutorialContainers = document.getElementsByClassName("tutorialContainer");
    return tutorialContainers[tutorialIndex];
  }

  var setupTutorial = function() {

    var tutorialIndex = 0;
    var totalPageNum;
    var tutorialContainers = document.getElementsByClassName("tutorialContainer");
    for(var i=0;i<tutorialContainers.length;i++) {
      //add tutorial id
      var tutorialIndexDiv = document.createElement("div")
      tutorialIndexDiv.innerHTML = tutorialIndex;
      tutorialIndexDiv.className = "tutorialIndexDiv";
      tutorialIndexDiv.style.display = "none";
      tutorialContainers[i].appendChild(tutorialIndexDiv);
      totalPageNum = tutorialContainers[i].getElementsByClassName("tutorialContentPage").length
      
      tutorialIndexToPageObject[tutorialIndex] = {page:0,totalPageNum:totalPageNum}
      setupTutorialHeader(tutorialIndex);
      updateTutorialPage(tutorialIndex);
      tutorialIndex++;
    }
  }

  setupTutorial();

  $(".tutorialPreviousButton").click(function(e) {
    var tutorialIndex = this.closest(".tutorialContainer").getElementsByClassName("tutorialIndexDiv")[0].innerHTML;
    
    tutorialIndexToPageObject[tutorialIndex].page--;
    //show next button
    setTutorialNextButtonVisibility(tutorialIndex, true)
    updateTutorialPage(tutorialIndex);
    return false;
  });

  $(".tutorialNextButton").click(function(e) {
    var tutorialIndex = this.closest(".tutorialContainer").getElementsByClassName("tutorialIndexDiv")[0].innerHTML;
    var tutorialPageObject = tutorialIndexToPageObject[tutorialIndex];
    tutorialPageObject.page++;

    if(tutorialPageObject.page == tutorialPageObject.totalPageNum) {
      //hide next button
      setTutorialNextButtonVisibility(tutorialIndex, false)
    }
    updateTutorialPage(tutorialIndex);

    return false;
  });
// Add tutorial video pop-out
window.getTutorialVideo = function(tutorialId) {
  window.parent.postMessage({type:"video", youtubeId:tutorialId}, '*');
}

  // Add image enlargement
  var allTutPics = document.getElementsByClassName('enlargeImage');
  for (var i = allTutPics.length - 1; i >= 0; i--) {
    var picHeight = allTutPics[i].height;
    var picWidth = document.getElementsByClassName("enlargeImage").width;
    var pwidth = allTutPics[i].width;
    if (pwidth == 0) {
     $(allTutPics[i]).width("100%");
       pwidth = 250;
     }

     var newDiv = document.createElement("div");
     newDiv.className = "tutorialDiv";
     // newDiv.style.width = pwidth;

     var tutImg = document.createElement("img");
     tutImg.src = allTutPics[i].src;
     // tutImg.style.cssText = allTutPics[i].style.cssText;
     // tutImg.style.width = pwidth + "px";
     tutImg.className = "enlargeImage";
     newDiv.appendChild(tutImg);

     var zoom = document.createElement("img");
     zoom.src = "../images/zoom.png";
     zoom.className = "zoom";
     // zoom.css({top: '200px', left: '200px', position:'absolute'});
     newDiv.appendChild(zoom);

     $(newDiv).insertBefore(allTutPics[i]);
     $(newDiv).next().remove();
   }

  $(".enlargeImage").click(function(imageId){
    window.parent.postMessage({type:"img", imageId:$(this).attr("src")}, '*');
  });

  $(".zoom").click(function(imageId){
    window.parent.postMessage({type:"img", imageId:$(this).prev(".enlargeImage").attr("src")}, '*');
  });

});
