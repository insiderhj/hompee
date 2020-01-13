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

// 비밀번호 변경
$('#btnChangePassword').on('click', function() {
    $('#divPassword').hide();
    $('#divNewPassword').show();
});

// 비밀번호 변경 취소
$('#btnCancelPassword').on('click', function() {
    $('#divNewPassword').hide();
    $('#inputOldPassword').val('');
    $('#inputNewPassword').val('');
    $('#inputNewPasswordCheck').val('');
    $('#divPassword').show();
});

// 비밀번호 변경 확인
$('#formChangePassword').on('submit', function() {
    event.preventDefault();

    $.ajax({
        url: "/checkPassword",
        type: "POST",
        data: {email: $('#email').text(), password: $('#inputOldPassword').val()},
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
                data: {email: $('#email').text(), password: $('#inputNewPassword').val()},
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

// 이름 변경
$('#btnChangeName').on('click', function() {
    $('#divName').hide();
    $('#divNewName').show();
});

// 이름 변경 완료
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

// 전화번호 변경
$('#btnChangePhoneNumber').on('click', function() {
    $('#divPhoneNumber').hide();
    $('#divNewPhoneNumber').show();
});

// 전화번호 변경 완료
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

// 주소1 변경
$('#btnChangeFirstAddress').on('click', function() {
    $('#divFirstAddress').hide();
    $('#divNewFirstAddress').show();
});

// 주소1 주소 찾기
$('#btnSearchFirstAddress').on('click', function() {
    var newWindow = window.open('/addressPopup', 'address popup', 'width=500, height=500, left=100, top=50');
    addressStatus = 'First';
    newWindow.focus();
});

// 주소1 변경 취소
$('#btnCancelFirstAddress').on('click', function() {
    $('#divNewFirstAddress').hide();
    $('#inputFirstZipCode').val('');
    $('#inputFirstAddress').val('');
    $('#inputFirstAddressDetail').val('');
    $('#inputFirstAddressDetail').attr('disabled', true);

    $('#divFirstAddress').show();
});

// 주소1 변경 완료
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

// 주소2 변경
$('#btnChangeSecondAddress').on('click', function() {
    $('#divSecondAddress').hide();
    $('#divNewSecondAddress').show();
});

// 주소2 주소찾기
$('#btnSearchSecondAddress').on('click', function() {
    var newWindow = window.open('/addressPopup', 'address popup', 'width=500, height=500, left=100, top=50');
    addressStatus = 'Second';
    newWindow.focus();
});

// 주소2 변경 취소
$('#btnCancelSecondAddress').on('click', function() {
    $('#divNewSecondAddress').hide();
    $('#inputSecondZipCode').val('');
    $('#inputSecondAddress').val('');
    $('#inputSecondAddressDetail').val('');
    $('#inputSecondAddressDetail').attr('disabled', true);

    $('#divSecondAddress').show();
});

// 주소2 변경 완료
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
