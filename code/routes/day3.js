var express = require('express');
var router = express.Router();

let userData = [

];
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
// 폼 데이터를 받아 userData 배열에 추가하고 홈페이지로 리다이렉트
router.post("/submit", (req, res) => {
    const { name, category, details } = req.body;

    //입력 값 검증
    if (!name || !category) {
        res.redirect("/day3");
        return;
    }

    //특수문자 이스케이프
    const escapedName = escapeHtml(name);

    // 한국 시간대 기준으로 오늘 날짜 가져오기
    const today = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Seoul'
    }).format(new Date()).replace(/\. /g, '-').replace('.', '');

    // 중복 검사: 동일 날짜에 같은 이름이 있는지 확인
    const index = userData.findIndex(entry => entry.name === escapedName && entry.submittedDate === today);

    if (index !== -1) {
        // 중복 데이터가 있으면 그 부분을 새로운 데이터로 대체
        userData[index] = { name: escapedName, category, details, submittedDate: today };
    }
    else {
        // 중복 아닌 경우 데이터 넣기
        userData.push({ name:escapedName, category, details,submittedDate: today});
    }

    console.log(userData); // TEST

    // 데이터 추가 후 페이지 리로드
    res.redirect("/day3"); 
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('day3_main', {userData:userData });
});

module.exports = router;