var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");

$(function() {
    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
});

function showStatus(status, removeClass, addClass) {
    $('#passwordStatus').html(status);
    $('#statusFrame').removeClass(removeClass);
    $('#statusFrame').addClass(addClass);
    $("#statusFrame").slideToggle("slow");
    $("#statusFrame").delay(2000).fadeOut(1500);
}

var confirmCode = undefined;

// 인증번호 받기 버튼
$('#btnSendCode').on('click', function() {
    $.ajax({
        url: "/emailExists",
        type: "POST",
        data: {email: $('#email').val()},
        success: function(emailExists) {
            if (!emailExists) {
                showStatus('해당 이메일로 가입된 계정이 없습니다.', 'getGrey', 'getRed');
                return;
            }

            $('#email').attr('disabled', true);
            $('#btnSendCode').hide();
            $('#btnChangeEmail').show();

            $('#confirmCode').attr('disabled', false);
            $('#btnCheckCode').attr('disabled', false);
            showStatus('이메일로 인증번호가 발송되었습니다.', 'getRed', 'getGrey');

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
        showStatus('이메일 인증이 완료되었습니다.', 'getRed', 'getGrey');

        $('#confirmCode').attr('disabled', true);
        $('#btnCheckCode').attr('disabled', true);
        $('#submit').attr('disabled', false);
    } else {
        showStatus('인증번호가 틀렸습니다.', 'getGrey', 'getRed');
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
});

$('#submit').on('click', function() {
    $('#email').attr('disabled', false);
    alert('비밀번호 변경이 완료되었습니다.');
});

$('#formChangePassword').on('submit', function() {
    if ($('#inputPassword').val() !== $('#inputPasswordCheck').val()) {
        showStatus('비밀번호와 비밀번호 확인란이 일치하지 않습니다.', 'getGrey', 'getRed');
        event.preventDefault();
    }
});
