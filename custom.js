var isLogIn = true;
var BTN_Login = document.getElementById("BTN-Login");
var BTN_Logout = document.getElementById("BTN-Logout");
let info_person = document.getElementById("info_person");



// // date picker
$(function () {
    $("#inputDate").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());
});


// Function to create a profile card and append to Owl Carousel


// owl carousel slider js


// Đăng nhập thì làm gì
function Login(){
    if(isLogIn){
        info_person.style.display = 'block';
        BTN_Logout.style.display = "block";
        BTN_Login.style.display = "none";
    }else{
        info_person.style.display = "none";
        BTN_Logout.style.display = "none";
        BTN_Login.style.display = "block";
    }
}
BTN_Logout.addEventListener('click', function(){
    isLogIn = false;
    Login();
});




//Yêu cầu đăng nhập khi submit

document.addEventListener("DOMContentLoaded", function () {
    // Gắn sự kiện "submit" với form
    document.getElementById("form_book").addEventListener("submit", function (event) {
      // Ngăn chặn hành động mặc định của form (tránh việc reload trang)
      event.preventDefault();

      // Gọi hàm xử lý khi submit
      submitForm();
    });
});

function submitForm() {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (isLogIn) {
      // Nếu đã đăng nhập, cho phép submit form
      document.getElementById("form_book").submit();
    } else {
      // Nếu chưa đăng nhập, yêu cầu đăng nhập
      alert("Vui lòng đăng nhập trước khi submit form.");
    }
}




