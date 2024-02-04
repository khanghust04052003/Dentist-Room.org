var isLogIn = false;



function submitForm() {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (isLogIn) {
      // Nếu đã đăng nhập, cho phép submit form
      document.getElementById("myForm").submit();
    } else {
      // Nếu chưa đăng nhập, yêu cầu đăng nhập
      alert("Vui lòng đăng nhập trước khi submit form.");
    }
}