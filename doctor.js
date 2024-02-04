


  // Hàm để lấy ngày hiện tại và 7 ngày tiếp theo
  function getNext7Days() {
    let days = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
      days.push(currentDate.toISOString().slice(0, 10));
    }
    return days;
  }

  // Hàm để tạo các option và thêm vào select
  function populateSelect() {
    const selectElement = document.getElementById('inputTimeDay');
    const days = getNext7Days();

    for (const day of days) {
      const option = document.createElement('option');
      option.value = day;
      option.textContent = day;
      selectElement.appendChild(option);
    }
  }

  // Gọi hàm để tạo và thêm các option
  populateSelect();


