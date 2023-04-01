/* list-by-member.js */
/* 판매 종료 된 제품이면 status 검사 후 label 띄워주기, 아래는 label 띄우는 코드 */
const $labelSpot=$(".label-spot");
const $boardThumb=$(".board-thumb");
console.log(mainFile)
function addLabel(){
    $labelSpot.append(`<label for="parent-block">판매종료</label>`);
    $boardThumb.css("opacity", 0.8).css("filter", "brightness(0.5)");
}

// addLabel();

  /****************************tothetop 버튼******************************* */
  var topBtn = document.getElementById("topBtn");

  window.onscroll = function() {
    scrollFunction()
  };
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }
  }
  
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  
  topBtn.addEventListener("click", topFunction);


/* 내가 쓴 게시물 다 넣기 */
/*let boards = "";

for (let i = 0; i < boardList.length; i++) {
    boards +=
        `
        <li>
        <a href="#" style="display: block;" id="parent-block">
            <div class="board-thumb-wrapper">
                <div class="board-thumb"  
                    data-board-file-path="${mainFile[i].boardFilePath}"
                    data-board-file-uuid="${mainFile[i].boardFileUuid}"
                    data-board-file-original-name="${mainFile[i].boardFileOriginalName}"
                    data-board-status="${boardList[i].boardStatus}">
                </div>
            </div>
            <p class="board-title">${boardList[i].boardTitle}</p>
            <p class="board-date">${boardList[i].boardUpdateDate}</p>
            <span class="label-spot"></span>
        </a>
       </li>
       `;
}
$("ul.list-outer").append(boards);*/

applyCSS()
function applyCSS() {
  $('.board-thumb').each(function (i) {
    let boardFilePath = $(this).data('board-file-path');
    let boardFileUuid = $(this).data('board-file-uuid');
    let boardFileOriginalName = $(this).data('board-file-original-name');
    let boardUrl = '/board-files/display?fileName=' + boardFilePath + '/t_' + boardFileUuid + '_' + boardFileOriginalName;
    $(this).css('background-image', 'url(' + boardUrl + ')');
  });
}
/* 내가 쓴 게시물 다 넣기 끝 */

/* 별점 넣기 */
for (let i = 0; i < avgScore; i++) {
  console.log($(".stars").children().eq(i+2).attr("src"))
  $(".stars").children().eq(i+2).attr("src", "/css/list/image/star.png");
}

/* 판매종료 */
let doneSale = 0;
for (let i = 0; i < boardList.length; i++) {
  if(boardList[i].boardStatus == true) {
    doneSale++
  }
}
$(".total-sold span").text(doneSale);
/* 판매종료 끝 */

/* ---------------------------무한 스크롤 ----------------------------*/
let page = 1;
let pathArray = window.location.pathname.split('/');
let memberId = pathArray.pop();
const $ul = $("ul.list-outer");
let boards = '';

const boardService = (() => {
  function getList(callback){
    $.ajax({
      url: `boards/lists/members/${memberId}?page=${page}`,
      type: 'post',
      success: function(boardDTOList){
        if(callback){
          callback(boardDTOList);
        }
      }
    });
  }
  return {getList: getList};
})();

function appendList() {
  boardService.getList(boardDTOList => {
    console.log(boardDTOList)
    boardDTOList.forEach(board => {
      const stars = generateStarHtml(board.avgScore);
      const thumbs = generateThumbsHtml(board.files);
      boards +=
          `
        <li>
        <a href="#" style="display: block;" id="parent-block">
            <div class="board-thumb-wrapper">
                <div class="board-thumb"  
                    data-board-file-path="${board.boardFilePath}"
                    data-board-file-uuid="${board.boardFileUuid}"
                    data-board-file-original-name="${board.boardFileOriginalName}"
                    data-board-status="${board.boardStatus}">
                </div>
            </div>
            <p class="board-title">${board.boardTitle}</p>
            <p class="board-date">${board.boardUpdateDate}</p>
            <span class="label-spot"></span>
        </a>
       </li>
       `;
    });
    if (boardDTOList.length === 0) { // 불러올 데이터가 없으면
      $(window).off('scroll'); // 스크롤 이벤트를 막음
      return;
    }
    $ul.append(boards);
    getProfileImage();
  });


}



$(window).scroll(function() {
  let zoomLevel = $('body').css('zoom');
  if (zoomLevel === '0.8') {
    if (Math.ceil($(window).scrollTop()/(zoomLevel)) + Math.ceil($(window).height()/zoomLevel) + 10 > $(document).height()) {
      page++;
      appendList();
      console.log(page)
      getProfileImage();
    }
  }
});
appendList();
/* 썸네일 사진 생성 코드 */
function generateThumbsHtml(files) {
  let thumbs = '';
  files.forEach(file => {
    thumbs += `
            <div class="pics-thumbs thumbs1" 
                data-board-file-path="${file.boardFilePath}" 
                data-board-file-uuid="${file.boardFileUuid}"
                data-board-file-original-name="${file.boardFileOriginalName}">
            </div>
        `;
  });
  return thumbs;
}
/* 별점 생성 코드 */
function generateStarHtml(avgScore) {
  let stars = '';
  for (let j = 0; j < 5; j++) {
    if (j < avgScore) {
      if (j < 5) {
        stars += "<img src='/css/main/images/star.png'>";
      }
    } else {
      stars += "<img src='/css/main/images/grey-star.png'>";
    }
  }
  return stars;
}

function getProfileImage(){
  $(document).ready(function() {
    $('.profile-thumbs').each(function() {
      let memberProfilePath = $(this).data('member-profile-path');
      let memberProfileUuid = $(this).data('member-profile-uuid');
      let memberProfileOriginalName = $(this).data('member-profile-original-name');
      let boardUrl = '/members/display?fileName=' + memberProfilePath + '/t_' + memberProfileUuid + '_' + memberProfileOriginalName;
      $(this).css('background-image', 'url(' + boardUrl + ')');
    });
  });
}


/* ---------------------------무한스크롤 끝------------------------------------- */





/*  판매종료 띄우기*/
window.onload = function (){
  for (let i = 0; i < boardList.length; i++) {
    if(boardList[i].boardStatus === true){
      $($(".label-spot")[i]).append(`<label for="parent-block">판매종료</label>`);
      $($(".board-thumb")[i]).css("opacity", 0.8).css("filter", "brightness(0.5)");
    }
     else{
    }
  }
}


