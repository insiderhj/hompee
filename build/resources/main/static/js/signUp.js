// spring security 사용중일 때 ajax통신 가능하게 해주는 부분
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");

$(function() {
    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
});

var confirmCode = undefined;
var addressStatus = undefined;

// 사용 가능한 이메일이면 true, 아니면 false 리턴
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function showStatus(status, removeClass, addClass) {
    $('#signUpStatus').html(status);
    $('#statusFrame').removeClass(removeClass);
    $('#statusFrame').addClass(addClass);
    $("#statusFrame").slideToggle("slow");
    $("#statusFrame").delay(2000).fadeOut(1500);
}

function getAddressValue(zipCode, address) {
    $('#input' + addressStatus + 'ZipCode').val(zipCode);
    $('#input' + addressStatus + 'Address').val(address);
    $('#input' + addressStatus + 'AddressDetail').val('');
    $('#input' + addressStatus + 'AddressDetail').attr('disabled', false);
}

// 인증번호 받기 버튼
$('#btnSendCode').on('click', function() {
    // 이메일 사용 가능 여부 확인
    if (!validateEmail($('#email').val())) {
        showStatus('이메일을 정확히 입력해주세요.', 'getGrey', 'getRed');
        return;
    }
        // 이메일 중복 체크
    $.ajax({
        url: "/emailExists",
        type: "get",
        data: {email: $('#email').val()},
        success: function (emailExists) {
            // 중복이 없다면 인증번호 발송
            if (emailExists) {
                showStatus('이미 가입한 이메일입니다.', 'getGrey', 'getRed');
                return;
            }

            $('#email').attr('disabled', true);
            $('#btnSendCode').hide();
            $('#btnChangeEmail').show();

            $('#confirmCode').attr('disabled', false);
            $('#btnCheckCode').attr('disabled', false);
            showStatus('이메일로 인증번호가 발송되었습니다!', 'getRed', 'getGrey');

            $.ajax({
                url: "/sendConfirmCode",
                type: "POST",
                data: {email: $('#email').val()},
                success: function (data) {
                    confirmCode = data;
                }
            });
        }
    });
});

// 이메일 변경 버튼 (초기상태로 돌아감)
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

// 인증번호 확인 버튼
$('#btnCheckCode').on('click', function() {
    if (confirmCode !== $('#confirmCode').val()) {
        showStatus('인증번호가 틀렸습니다.', 'getGrey', 'getRed');
        return;
    }

    showStatus('이메일 인증이 완료되었습니다!', 'getRed', 'getGrey');

    $('#confirmCode').attr('disabled', true);
    $('#btnCheckCode').attr('disabled', true);
    $('#submit').attr('disabled', false);
});

// 주소 찾기 버튼
$('#btnSearchFirstAddress').on('click', function() {
    var newWindow = window.open('/addressPopup', 'address popup', 'width=400, height=300, left=100, top=50');
    addressStatus = 'First';
    newWindow.focus();
});

$('#btnSearchSecondAddress').on('click', function() {
    var newWindow = window.open('/addressPopup', 'address popup', 'width=400, height=300, left=100, top=50');
    addressStatus = 'Second';
    newWindow.focus();
});

$('#formSignUp').on('submit', function() {
    $('#email').attr('disabled', false);
    $('#inputFirstZipCode').attr('disabled', false);
    $('#inputFirstAddress').attr('disabled', false);
    $('#inputSecondZipCode').attr('disabled', false);
    $('#inputSecondAddress').attr('disabled', false);

    if ($('#inputPassword').val() !== $('#inputPasswordCheck').val()) {
        showStatus('비밀번호와 비밀번호 확인란이 일치하지 않습니다.', 'getGrey', 'getRed');
        event.preventDefault();
        return;
    }

    alert('회원가입이 완료되었습니다.');
});
