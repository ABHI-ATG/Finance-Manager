const currentYear = new Date().getFullYear();
const year = Array.from({ length: 51 }, (_, i) => currentYear - i);
export default year;
