const R = require('ramda');

console.clear();

// compose
// example : quá trình tạo ra cốc nước ép sử dụng hàm compose
const step1 = x => `${x} được gọt vỏ`;
const step2 = x => `${x}, được cắt nhỏ`;
const step3 = x => `${x}, được ép`;
const step4 = x => `${x}, được đựng vào cốc`;

const juice = R.compose(step4,step3,step2,step1);
console.log(juice('quả dưa hấu')); // quả dưa hấu được gọt vỏ, được cắt nhỏ, được ép, được đựng vào cốc



// pipe
// example : quá trình tạo đĩa hoa quả ướp lạnh sử dụng hàm pipe
const step5 = x => `${x}, được ướp lạnh`;
const step6 = x => `${x}, được cho lên đĩa`;

const chilledFruit = R.pipe(step1,step2,step5,step6);
console.log(chilledFruit('quả táo')); // quả táo được gọt vỏ, được cắt nhỏ, được ướp lạnh, được cho lên đĩa



// curry
// example : tính tổng 5 số
const calc = (a, b, c, d, e) => a + b + c + d + e;

const curriedCalc = R.curry(calc);
const x = curriedCalc(1); // curriedCalc(1), 1 đại diện cho a , return 1 function mới với 4 tham số x(b, c, d, e)
                          // x(b, c, d, e) return 1 + b + c + d + e

const y = x(2);           // x(2) , 2 đại diện cho b, return 1 function mới với 3 tham số y(c ,d ,e)
                          // y(c ,d ,e) return 1 + 2 + c + d + e

const z = y(3 ,4);        // y(3 ,4) , 3 đại diện cho c, 4 đại diện cho d , return function mới với 1 tham số z(e)
                          // z(e) return 1 + 2 + 3 + 4 + e

console.log('result: ' + z(5)); // result: 15



// useWith
// example : tính tổng 3 số

const calcThreeNumbers = (a,b,c) => a + b + c;
const getNumber = R.curry(n => Number(n));
// useWith nhận vào 2 tham số,
// tham số thứ nhất là 1 function
// tham số thứ 2 là 1 [ mảng các curry function ]
// R.useWith trả về một curry function mới với tham số lần lượt là tham số của [ các curry function trong mảng ]
// ở đây là 3 tham số tương đương với a b c của hàm calcThreeNumbers
// đối số 1 2 3 được truyền vào [getNumber,getNumber,getNumber] dữ liệu trả về từ các getNumber được truyền vào calcThreeNumbers()
// trường hợp truyền vào nhiều đối số hơn , các đối số đó được chuyển trực tiếp vào calcThreeNumbers()
const useWidthCalcThreeNumbers = R.useWith(calcThreeNumbers,[getNumber,getNumber,getNumber]);
console.log(useWidthCalcThreeNumbers(1,2,3)); // 6



// converge
// example : tính tổng 3 số

// converge nhận vào 2 tham số,
// tham số thứ nhất là 1 function
// tham số thứ 2 là 1 [ mảng các curry function ]
// R.converge trả về 1 curry function mới với 1 tham số, tham số này áp dụng cho tất cả curry function trong mảng
// ở đây là 3 tham số tương đương với a b c của hàm calcThreeNumbers
// đối số 10 được truyền vào [getNumber,getNumber,getNumber] dữ liệu trả về từ các getNumber được truyền vào calcThreeNumbers()
const convergeCalcThreeNumbers = R.converge(calcThreeNumbers, [getNumber,getNumber,getNumber]);
console.log(convergeCalcThreeNumbers(10)); // 30



// prop
// example : lấy ra giá trị theo key
const user = { name : "user 01" , age: 18}
const arrayNum = [123,456,789]
const getValue = R.prop(R.__,R.__) // tham số thứ nhất là key , tham số thứ 2 là array hoặc object

console.log(getValue('name',user)) // user 01
console.log(getValue('phone',user)) // undefined
console.log(getValue(1,arrayNum))  // 456



// juxt
// example : lấy ra số nhỏ nhất và lớn nhất
// juxt áp dụng 1 danh sách các giá trị cho một danh sách các mảng
// R.juxt nhận vào một danh sách các hàm

const getRange = R.juxt([Math.min, Math.max]);
console.log(getRange(-10,1,2,3,4,5,6)) // [ -10, 6 ]
