// spring security 사용중일 때 ajax통신 가능하게 해주는 부분
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");

$(function() {
    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
});

$('#btnChangePassword').on('click', function() {
    $('#btnChangePassword').hide();

    $('#inputOldPassword').show();
    $('#inputNewPassword').show();
    $('#btnSubmitPassword').show()
});

$('#formChangePassword').on('submit', function() {
    event.preventDefault();

    $.ajax({
        url: "/checkPassword",
        type: "POST",
        data: {password: $('#inputOldPassword').val()},
        success: function(result) {
            if (!result) {
                $('#changePasswordStatus').text('현재 비밀번호가 틀렸습니다.');
                return;
            }

            $.ajax({
                url: "/updatePassword",
                type: "POST",
                data: {password: $('#inputNewPassword').val()},
                success: function() {
                    $('#changePasswordStatus').text('');
                    alert('비밀번호가 변경되었습니다.');

                    $('#inputOldPassword').val('');
                    $('#inputNewPassword').val('');

                    $('#inputOldPassword').hide();
                    $('#inputNewPassword').hide();
                    $('#btnSubmitPassword').hide();

                    $('#btnChangePassword').show();
                }
            })
        }
    })
});

$('#btnChangeName').on('click', function() {
    $('#txtName').hide();
    $('#btnChangeName').hide();

    $('#inputName').show();
    $('#btnSubmitName').show();
});

$('#formChangeName').on('submit', function() {
    event.preventDefault();

    $('#inputName').hide();
    $('#btnSubmitName').hide();

    $('#txtName').text($('#inputName').val());
    $('#txtName').show();
    $('#btnChangeName').show();

    $.ajax({
        url: "/updateName",
        type: "POST",
        data: {email: $('#email').text(), name:$('#txtName').text()}
    });
});

$('#btnChangePhoneNumber').on('click', function() {
    $('#txtPhoneNumber').hide();
    $('#btnChangePhoneNumber').hide();

    $('#inputPhoneNumber').show();
    $('#btnSubmitPhoneNumber').show();
});

$('#formChangePhoneNumber').on('submit', function() {
    event.preventDefault();

    $('#inputPhoneNumber').hide();
    $('#btnSubmitPhoneNumber').hide();

    $('#txtPhoneNumber').text($('#inputPhoneNumber').val());
    $('#txtPhoneNumber').show();
    $('#btnChangePhoneNumber').show();

    $.ajax({
        url: "/updatePhoneNumber",
        type: "POST",
        data: {email: $('#email').text(), phoneNumber:$('#txtPhoneNumber').text()}
    });
});
