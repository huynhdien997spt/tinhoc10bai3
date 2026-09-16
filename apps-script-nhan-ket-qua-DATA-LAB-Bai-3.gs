/**
 * MÃ NÀY DÁN VÀO GOOGLE APPS SCRIPT — không phải file chạy trên máy.
 *
 * Chức năng: nhận kết quả học sinh gửi lên từ trang DATA LAB,
 * ghi mỗi lượt gửi thành một dòng mới trong Google Sheet.
 *
 * File Google Sheets: DATA LAB - Bài 3
 * Tab nhận dữ liệu: KET_QUA_HOC_SINH
 */
function doPost(e) {
  var sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("KET_QUA_HOC_SINH");

  // Báo lỗi rõ ràng nếu tab bị đổi tên hoặc không tồn tại
  if (!sheet) {
    return ContentService
      .createTextOutput("ERROR: Không tìm thấy sheet KET_QUA_HOC_SINH")
      .setMimeType(ContentService.MimeType.TEXT);
  }

  // Tạo dòng tiêu đề nếu Sheet còn trống
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Thời gian nhận",
      "Họ tên",
      "Nhóm",
      "XP",
      "Huy hiệu",
      "Hoàn thành",
      "Lý do gửi",
      "Thời gian trên máy học sinh",
      "Chi tiết hoạt động (JSON)",
      "Chi tiết câu trả lời (JSON)"
    ]);
  }

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.hoTen || "",
    data.nhom || "",
    data.xp || 0,
    data.badge || "",
    data.hoanThanh || "",
    data.lyDoGui || "",
    data.thoiGian || "",
    JSON.stringify(data.hoatDong || {}),
    JSON.stringify(data.cauTraLoi || {})
  ]);

  return ContentService
    .createTextOutput("OK")
    .setMimeType(ContentService.MimeType.TEXT);
}
