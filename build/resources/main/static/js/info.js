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
    $("#statusFrame").delay(2000).fadeOut(1500);
}

function getAddressValue(zipCode, address) {
    $('#input' + addressStatus + 'ZipCode').val(zipCode);
    $('#input' + addressStatus + 'Address').val(address);
    $('#input' + addressStatus + 'AddressDetail').val('');
    $('#input' + addressStatus + 'AddressDetail').attr('disabled', false);
}

$('#btnChangePassword').on('click', function() {
    $('#divPassword').hide();
    $('#divNewPassword').show();
});

$('#btnCancelPassword').on('click', function() {
    $('#divNewPassword').hide();
    $('#inputOldPassword').val('');
    $('#inputNewPassword').val('');
    $('#inputNewPasswordCheck').val('');
    $('#divPassword').show();
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

            if ($('#inputNewPassword').val() !== $('#inputNewPasswordCheck').val()) {
                showStatus('비밀번호와 비밀번호 확인란이 일치하지 않습니다.', 'getGrey', 'getRed');
                return;
            }

            $.ajax({
                url: "/updatePassword",
                type: "POST",
                data: {password: $('#inputNewPassword').val()},
                success: function() {
                    showStatus('비밀번호가 변경되었습니다.', 'getRed', 'getGrey');

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
    $('#inputFirstZipCode').val('');
    $('#inputFirstAddress').val('');
    $('#inputFirstAddressDetail').val('');
    $('#inputFirstAddressDetail').attr('disabled', true);

    $('#divFirstAddress').show();
});

$('#formChangeFirstAddress').on('submit', function() {
    event.preventDefault();

    var zipCode = $('#inputFirstZipCode').val();
    var address = $('#inputFirstAddress').val() === '' ? '' : $('#inputFirstAddress').val() + ' ' + $('#inputFirstAddressDetail').val();

    $('#divNewFirstAddress').hide();
    $('#inputFirstZipCode').val('');
    $('#inputFirstAddress').val('');
    $('#inputFirstAddressDetail').val('');
    $('#inputFirstAddressDetail').attr('disabled', true);

    $('#txtFirstAddress').text(address);
    $('#divFirstAddress').show();

    $.ajax({
        url: "/updateFirstAddress",
        type: "POST",
        data: {email: $('#email').text(), firstZipCode: zipCode, firstAddress: address}
    });
});

$('#btnChangeSecondAddress').on('click', function() {
    $('#divSecondAddress').hide();
    $('#divNewSecondAddress').show();
});

$('#btnSearchSecondAddress').on('click', function() {
    var newWindow = window.open('/addressPopup', 'address popup', 'width=400, height=300, left=100, top=50');
    addressStatus = 'Second';
    newWindow.focus();
});

$('#btnCancelSecondAddress').on('click', function() {
    $('#divNewSecondAddress').hide();
    $('#inputSecondZipCode').val('');
    $('#inputSecondAddress').val('');
    $('#inputSecondAddressDetail').val('');
    $('#inputSecondAddressDetail').attr('disabled', true);

    $('#divSecondAddress').show();
});

$('#formChangeSecondAddress').on('submit', function() {
    event.preventDefault();

    var zipCode = $('#inputSecondZipCode').val();
    var address = $('#inputSecondAddress').val() === '' ? '' : $('#inputSecondAddress').val() + ' ' + $('#inputSecondAddressDetail').val();

    $('#divNewSecondAddress').hide();
    $('#inputSecondZipCode').val('');
    $('#inputSecondAddress').val('');
    $('#inputSecondAddressDetail').val('');
    $('#inputSecondAddressDetail').attr('disabled', true);

    $('#txtSecondAddress').text(address);
    $('#divSecondAddress').show();

    $.ajax({
        url: "/updateSecondAddress",
        type: "POST",
        data: {email: $('#email').text(), secondZipCode: zipCode, secondAddress: address}
    });
});