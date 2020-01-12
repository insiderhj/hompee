var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");

$(function() {
    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
});

var confirmCode = undefined;

// 인증번호 받기 버튼
$('#btnSendCode').on('click', function() {
    $.ajax({
        url: "/emailExists",
        type: "POST",
        data: {email: $('#email').val()},
        success: function(emailExists) {
            if (!emailExists) {
                $('#confirmStatus').text('해당 이메일로 가입한 계정이 없습니다.');
                return;
            }

            $('#email').attr('disabled', true);
            $('#btnSendCode').hide();
            $('#btnChangeEmail').show();

            $('#confirmCode').attr('disabled', false);
            $('#btnCheckCode').attr('disabled', false);
            $('#confirmStatus').text('이메일로 인증번호가 발송되었습니다.');

            // 이메일로 confirm 코드 보내고 변수에 저장
            $.ajax({
                url: "/sendConfirmCode",
                type: "POST",
                data: {email: $('#email').val()},
                success: function(data) {
                    confirmCode = data;
                }
            })
        }
    });
});

// 인증번호 확인 버튼
$('#btnCheckCode').on('click', function() {
    if (confirmCode === $('#confirmCode').val()) {
        $('#confirmStatus').text('이메일 인증이 완료되었습니다!');

        $('#confirmCode').attr('disabled', true);
        $('#btnCheckCode').attr('disabled', true);
        $('#submit').attr('disabled', false);
    } else {
        $('#confirmStatus').text('인증번호가 틀렸습니다.')
    }
});

// 이메일 변경 버튼 (누르면 초기상태로 돌아감)
$('#btnChangeEmail').on('click', function() {
    $('#email').val('');
    $('#email').attr('disabled', false);
    $('#btnChangeEmail').hide();
    $('#btnSendCode').show();

    $('#confirmCode').val('');
    $('#confirmCode').attr('disabled', true);
    $('#btnCheckCode').attr('disabled', true);
    $('#submit').attr('disabled', true);

    $('#confirmStatus').text('');
});

$('#submit').on('click', function() {
    $('#email').attr('disabled', false);
    alert('비밀번호 변경이 완료되었습니다.');
});
