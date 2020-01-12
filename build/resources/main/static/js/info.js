// spring security 사용중일 때 ajax통신 가능하게 해주는 부분
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");

$(function() {
    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
});

var addressStatus = undefined;

function showStatus(status, removeClass, addClass) {
    $('#infoStatus').html(status);
    $('#statusFrame').removeClass(removeClass);
    $('#statusFrame').addClass(addClass);
    $("#statusFrame").slideToggle("slow");
    $("#statusFrame").delay(5000).fadeOut(1500);
}

function getAddressValue(address) {
    $('#input' + addressStatus + 'Address').val(address);
    $('#input' + addressStatus + 'AddressDetail').val('');
    $('#input' + addressStatus + 'AddressDetail').attr('disabled', false);
}

$('#btnChangePassword').on('click', function() {
    $('#divPassword').hide();
    $('#divNewPassword').show();
});

$('#formChangePassword').on('submit', function() {
    event.preventDefault();

    $.ajax({
        url: "/checkPassword",
        type: "POST",
        data: {password: $('#inputOldPassword').val()},
        success: function(result) {
            if (!result) {
                showStatus('현재 비밀번호가 틀렸습니다.', 'getGrey', 'getRed');
                return;
            }

            $.ajax({
                url: "/updatePassword",
                type: "POST",
                data: {password: $('#inputNewPassword').val()},
                success: function() {
                    showStatus('비밀번호가 변경되었습니다', 'getRed', 'getGrey');

                    $('#inputOldPassword').val('');
                    $('#inputNewPassword').val('');

                    $('#divNewPassword').hide();
                    $('#divPassword').show();
                }
            })
        }
    })
});

$('#btnChangeName').on('click', function() {
    $('#divName').hide();
    $('#divNewName').show();
});

$('#formChangeName').on('submit', function() {
    event.preventDefault();

    $('#divNewName').hide();
    $('#txtName').text($('#inputName').val());
    $('#divName').show();

    $.ajax({
        url: "/updateName",
        type: "POST",
        data: {email: $('#email').text(), name:$('#txtName').text()}
    });
});

$('#btnChangePhoneNumber').on('click', function() {
    $('#divPhoneNumber').hide();
    $('#divNewPhoneNumber').show();
});

$('#formChangePhoneNumber').on('submit', function() {
    event.preventDefault();

    $('#divNewPhoneNumber').hide();
    $('#txtPhoneNumber').text($('#inputPhoneNumber').val());
    $('#divPhoneNumber').show();

    $.ajax({
        url: "/updatePhoneNumber",
        type: "POST",
        data: {email: $('#email').text(), phoneNumber:$('#txtPhoneNumber').text()}
    });
});

$('#btnChangeFirstAddress').on('click', function() {
    $('#divFirstAddress').hide();
    $('#divNewFirstAddress').show();
});

$('#btnSearchFirstAddress').on('click', function() {
    var newWindow = window.open('/addressPopup', 'address popup', 'width=400, height=300, left=100, top=50');
    addressStatus = 'First';
    newWindow.focus();
});

$('#btnCancelFirstAddress').on('click', function() {
    $('#divNewFirstAddress').hide();
    $('#inputFirstAddress').val('');
    $('#inputFirstAddressDetail').val('');
    $('#inputFirstAddressDetail').attr('disabled', true);

    $('#divFirstAddress').show();
});

$('#formChangeFirstAddress').on('submit', function() {
    event.preventDefault();

    $('#divNewFirstAddress').hide();

    if ($('#inputFirstAddress').val() === '') {
        $('#txtFirstAddress').text('');
    } else {
        $('#txtFirstAddress').text($('#inputFirstAddress').val() + ' ' + $('#inputFirstAddressDetail').val());
    }

    $('#inputFirstAddress').val('');
    $('#inputFirstAddressDetail').val('');
    $('#inputFirstAddressDetail').attr('disabled', true);

    $('#divFirstAddress').show();

    $.ajax({
        url: "/updateFirstAddress",
        type: "POST",
        data: {email: $('#email').text(), firstAddress: $('#txtFirstAddress').text()}
    });
});
