$('#closeAccount').on('click', function() {
    var confirmResult = confirm("정말 회원탈퇴하시겠습니까?");
    if (!confirmResult) {
        event.preventDefault();
        return
    }
    alert('회원탈퇴가 완료되었습니다.');
});