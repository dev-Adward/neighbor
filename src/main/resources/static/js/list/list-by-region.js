/* list-by-region.html */
const $radios= $(".input-selection");

let arr = ["1234", '123', "543254"];

// index 번호가 지역구 번호
const $region_list = ["전체", "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", 
                    "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", 
                    "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", 
                    "중구", "중랑구" ];

// 지도에서 선택한 지역구 표시할 곳
const $selected_region = $(".selected-region");

// 초기화 버튼 누르면 선택 초기화 (전체 선택 default)
function resetMap(){
    $radios.each((i, e) => {
        console.log(e);
        e.checked = false;
        $selected_region.text($region_list[0]);
    });
}

// 지도에서 선택 한 지역구 리스트 제목으로 반환
function locationClick(num){
    $selected_region.text($region_list[num]);
}

// 드롭다운에서 선택한 지역구 반환
$(".select-region-drop").change(function() {
    var selectedValue = $(this).val();
    $("input[type='radio'][name='regionMap'][value='" + selectedValue + "']").prop("checked", true);
});

// select 요소 변경 시 input[type=radio] 요소 선택 상태 변경 함수
function changeInputState() {
    var selectVal = $('.select-region-drop').val(); // select 요소의 현재 값 가져오기
    $('input[type=radio]').each(function() {
      if ($(this).val() === selectVal) { // 현재 select 요소 값과 일치하는 input[type=radio] 요소를 찾으면
        $(this).prop('checked', true); // 해당 input[type=radio] 요소를 선택한 상태로 변경
        locationClick($(this).val());
      }
    });
  }
  
  // input[type=radio] 요소 선택 상태 변경 시 select 요소 값 변경 함수
  function changeSelectState() {
    var radioVal = $('input[type=radio]:checked').val(); // 선택된 input[type=radio] 요소의 값 가져오기
    $('.select-region-drop').val(radioVal); // 해당 값으로 select 요소를 변경
  }
  
  // select 요소 변경 이벤트 등록
  $('.select-region-drop').on('change', changeInputState);
  
  // input[type=radio] 요소 선택 상태 변경 이벤트 등록
  $('input[type=radio]').on('change', changeSelectState);

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
  
  /* 프로필 백그라운드 이미지 넣기 */
getProfileImage();
/*----------------------- 위 프로필 --------------------------------- */
    let boardList = "";

for (let i = 0; i < 3 && i < boardDTO.length; i++) {
    let stars = '';

    for (let j = 0; j < 5; j++) {
        if (j < boardDTO[i].avgScore) {
            if (j < 5) {
                stars += "<img src='/css/main/images/star.png'>";
            }
        } else {
            stars += "<img src='/css/main/images/grey-star.png'>";
        }
    }

    boardList +=
        `
            <!-- 항목1 -->
            <li>
                <!-- 상세페이지로 바로가기 -->
                <a href="/boards/detail/${boardDTO[i].boardId}"></a>
                <!-- 내용 -->
                <div class="cont">
                    <!-- 썸네일 -->
                    <a href="#">
                        <div class="thumbs" data-member-profile-path="${boardDTO[i].memberProfilePath}" data-member-profile-uuid="${boardDTO[i].memberProfileUuid}"
                                data-member-profile-original-name="${boardDTO[i].memberProfileOriginalName}"></div>
                    </a>
                    <!-- //썸네일 -->
                    <!-- 제목 -->
                    <p class="name">
                        <a href="#">${boardDTO[i].boardTitle}</a>
                        <a href="https://naver.me/x5cHxSpy" target="_blank" class="map_link">${boardDTO[i].boardRegionKo}</a>
                    </p>
                    <!-- //제목 -->
                    <!-- 기타 정보 -->
                    <div class="info-container">
                        <span class="stars">
                            ${stars}
                        </span>
                        <span class="tag">${boardDTO[i].memberEmail}</span>
                    </div>
                    <!-- 기타 정보 -->
                    <!-- 좋아요 및 즐겨찾기 -->
                    <div class="state">
                        <span class="won" >${boardDTO[i].boardPrice}</span>
                    </div>
                    <!-- //좋아요 및 즐겨찾기 -->
                </div>
                <!-- //내용 -->
            </li>
            <!-- //항목1 -->
        `;
}
$(".best-list").append(boardList);
/*------------- for loop 페이징 처리 안된것 -------------------*/
/*

$("ul.best-list").append(boardList);
/!* 위에 리스트에 추가하기  *!/

let boardList2 ='';
let thumbs = [];
for (let i = 0; i < boardDTO.length; i++) {
    let thumbs = [];
    let stars = '';

    for (let j = 0; j < boardDTO[i].files.length; j++) {
        thumbs.push(`
            <div class="pics-thumbs thumbs1" 
                data-board-file-path="${boardDTO[i].files[j].boardFilePath}" 
                data-board-file-uuid="${boardDTO[i].files[j].boardFileUuid}"
                data-board-file-original-name="${boardDTO[i].files[j].boardFileOriginalName}">
            </div>
        `);
    }


    for (let j = 0; j < 5; j++) {
        if (j < boardDTO[i].avgScore) {
            if (j < 5) {
                stars += "<img src='/css/main/images/star.png'>";
            }
        } else {
            stars += "<img src='/css/main/images/grey-star.png'>";
        }
    }
    boardList2 +=
                        `
                        <a>
                            <li class="result-list-container" >
                                <div class="result-list-outer-box">
                                     <a href="/boards/detail/${boardDTO[i].boardId}">
                                        <div class="profile-area-box">
                                            <div class="profile-area">
                                                <div class="profile-area-inner">
                                                    <div class="thumbs" data-member-profile-path="${boardDTO[i].memberProfilePath}" data-member-profile-uuid="${boardDTO[i].memberProfileUuid}"
                                                         data-member-profile-original-name="${boardDTO[i].memberProfileOriginalName}"></div>
                                                    <p class="id">
                                                        <span>${boardDTO[i].memberNickname}</span>
                                                    </p>
                                                    <div class="location">
                                                        <span class="map">${boardDTO[i].boardRegionKo}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <img src="/css/list/image/arrow_r.png">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="title-area-box">
                                            <div class="title-area">
                                                <span class="list-title">${boardDTO[i].boardTitle}</span>
                                                <span class="stars">
                                                ${stars}
                                            </span>
                                            </div>
                                            <div class="sub-info-area-box">
                                                <div class="price">
                                                    <span class="won">${boardDTO[i].boardPrice}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="pic-box">
                                            ${thumbs.join(' ')}
                                    </a>
                                </div>
                            </li>
                        </a>
                     `
}
$(".result-list").append(boardList2)
*/



/* -------------------------무한 스크롤-------------------------------- */
let page = 1;
let isLastPage = false;
const $ul = $("#list");
let boardText3 = '';

const boardService = (() => {
    function getList(callback){
        $.ajax({
            url: `/boards/lists/regions?page=${page}`,
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
//10개보다 적을시 한번은 실행되야함

function appendList() {
    boardService.getList(boardDTOList => {
        console.log(boardDTOList)
        boardDTOList.forEach(board => {
            const stars = generateStarHtml(board.avgScore);
            const thumbs = generateThumbsHtml(board.files);
            boardText3 +=  `
                <a>
                    <li class="result-list-container" >
                        <div class="result-list-outer-box">
                            <a href="/boards/detail/${board.boardId}">
                                <div class="profile-area-box">
                                    <div class="profile-area">
                                        <div class="profile-area-inner">
                                            <div class="thumbs" data-member-profile-path="${board.memberProfilePath}" data-member-profile-uuid="${board.memberProfileUuid}"
                                                data-member-profile-original-name="${board.memberProfileOriginalName}"></div>
                                            <p class="id">
                                                <span>${board.memberNickname}</span>
                                            </p>
                                            <div class="location">
                                                <span class="map">${board.boardRegionKo}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <img src="/css/list/image/arrow_r.png">
                                        </div>
                                    </div>
                                </div>
                                <div class="title-area-box">
                                    <div class="title-area">
                                        <span class="list-title">${board.boardTitle}</span>
                                        <span class="stars">
                                            ${stars}
                                        </span>
                                    </div>
                                    <div class="sub-info-area-box">
                                        <div class="price">
                                            <span class="won">${board.boardPrice}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="pic-box">
                                    ${thumbs}
                                </div>
                            </a>
                        </div>
                    </li>
                </a>
            `;
        });
        if (boardDTOList.length === 0) { // 불러올 데이터가 없으면
            $(window).off('scroll'); // 스크롤 이벤트를 막음
            return;
        }
        $ul.append(boardText3);
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
    $('.thumbs1').each(function () {
        let boardFilePath = $(this).data('board-file-path');
        let boardFileUuid = $(this).data('board-file-uuid');
        let boardFileOriginalName = $(this).data('board-file-original-name');
        let boardUrl = '/board-files/display?fileName=' + boardFilePath + '/t_' + boardFileUuid + '_' + boardFileOriginalName;
        $(this).css('background-image', 'url(' + boardUrl + ')');
    });

    $('.thumbs').each(function () {
        let memberProfilePath = $(this).data('member-profile-path');
        let memberProfileFileUuid = $(this).data('member-profile-uuid');
        let memberProfileOriginalName = $(this).data('member-profile-original-name');
        let membeUrl = '/members/display?fileName=' + memberProfilePath + '/t_' + memberProfileFileUuid + '_' + memberProfileOriginalName;
        $(this).css('background-image', 'url(' + membeUrl + ')');
    });

}