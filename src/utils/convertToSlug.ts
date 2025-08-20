export function convertToSlug(str: string): string {
  return str
    .toLowerCase() // chuyển hết về chữ thường
    .normalize("NFD") // tách dấu khỏi chữ
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/đ/g, "d") // thay đ -> d
    .replace(/[^a-z0-9\s-]/g, "") // xóa ký tự đặc biệt
    .replace(/\s+/g, "-") // thay khoảng trắng = "-"
    .replace(/-+/g, "-") // bỏ trùng dấu "-"
    .replace(/^-+|-+$/g, ""); // xóa "-" ở đầu và cuối
}