const R = require('ramda');

console.clear();

// compose
// example : quá trình tạo ra cốc nước ép sử dụng hàm compose
const step1 = x => `${x} được gọt vỏ`;
const step2 = x => `${x}, được cắt nhỏ`;
const step3 = x => `${x}, được ép`;
const step4 = x => `${x}, được đựng vào cốc`;
// input => "quả dưa hấu"
// quả dưa hấu được đưa vào step1 trả về "quả dưa hấu được gọt vỏ"
// "quả dưa hấu được gọt vỏ" của step1 được đưa vào step2 trả về "quả dưa hấu được gọt vỏ, được cắt nhỏ"
// dữ liệu trả về của step 2 được đưa vào step 3
// dữ liệu trả về của step 3 được đưa vào step 4
// cuối cùng thu được => quả dưa hấu được gọt vỏ, được cắt nhỏ, được ép, được đựng vào cốc
const juice = R.compose(step4,step3,step2,step1);
juice('quả dưa hấu')
// output => "quả dưa hấu được gọt vỏ, được cắt nhỏ, được ép, được đựng vào cốc"




// pipe
// example : quá trình tạo đĩa hoa quả ướp lạnh sử dụng hàm pipe
const step5 = x => `${x}, được ướp lạnh`;
const step6 = x => `${x}, được cho lên đĩa`;
// input => "quả táo"
const chilledFruit = R.pipe(step1,step2,step5,step6);
chilledFruit('quả táo')
// output => "quả táo được gọt vỏ, được cắt nhỏ, được ướp lạnh, được cho lên đĩa"




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
// call hàm z()
// input 5
z(5)
// output => 1 + 2 + 3 + 4 + 5 => 15



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
// input 1, 2, 3
useWidthCalcThreeNumbers(1,2,3); // 6
// output 6



// converge
// example : tính tổng 3 số

// converge nhận vào 2 tham số,
// tham số thứ nhất là 1 function
// tham số thứ 2 là 1 [ mảng các curry function ]
// R.converge trả về 1 curry function mới với 1 tham số, tham số này áp dụng cho tất cả curry function trong mảng
// ở đây là 3 tham số tương đương với a b c của hàm calcThreeNumbers
// đối số 10 được truyền vào [getNumber,getNumber,getNumber] dữ liệu trả về từ các getNumber được truyền vào calcThreeNumbers()
const convergeCalcThreeNumbers = R.converge(calcThreeNumbers, [getNumber,getNumber,getNumber]);
// input 10
convergeCalcThreeNumbers(10)
// output 30




// prop
// example : lấy ra giá trị theo key
const user = { name : "user 01" , age: 18}
const arrayNum = [123,456,789]
const getValue = R.prop(R.__,R.__) // tham số thứ nhất là key , tham số thứ 2 là array hoặc object

// input "name", { name : "user 01" , age: 18}
getValue('name',user);
// output => "user 01"

// input "name", { name : "user 01" , age: 18}
getValue('phone',user);
// output => "undefined"

// input "name", [123,456,789]
getValue(1,arrayNum);
// output => 456




// juxt
// example : lấy ra số nhỏ nhất và lớn nhất
// juxt áp dụng 1 danh sách các giá trị cho một danh sách các hàm
// R.juxt nhận vào một danh sách các hàm
//input => [Math.min, Math.max]
const getRange = R.juxt([Math.min, Math.max]);
//output => getRange(values)

//input => [-10,1,2,3,4,5,6]
getRange(-10,1,2,3,4,5,6);
// output => [ -10, 6 ] ~ [min, max]




// nthArg
// example lấy ra phần tử đầu và cuối trong mảng sử dụng nthArg
const arrayNumbers = [12, 13, 14, 15, 16, 17];

// input 0 // output => getFirstItem(array) => array[0]
const getFirstItem = R.nthArg(0);

// với đối số âm
// input -1 // output => getLastItem(array) => array[array.length -1]
const getLastItem = R.nthArg(-1);

getFirstItem(...arrayNumbers) // input 12, 13, 14, 15, 16, 17 // output => 12
getLastItem(...arrayNumbers) // input 12, 13, 14, 15, 16, 17 // output => 17




// pluck
// example : lấy ra danh sách tên sản phẩm và danh sách mã sản phẩm

const products = [
    {productName: 'product 01', code: 332434, price: 123},
    {productName: 'product 02', code: 332987, price: 234},
    {productName: 'product 03', code: 332355, price: 345},
    {productName: 'product 04', code: 332876, price: 456},
];
// input 'productName'
// output getName(array) hàm getName trả về 1 mảng mới các giá trị được lấy từ array theo key 'productName'
const getName = R.pluck('productName');
// input 'code'
// output getCode(array) hàm getCode trả về 1 mảng mới các giá trị được lấy từ array theo key 'code'
const getCode = R.pluck('code');
// R.pluck trả về 1 hàm mới nhận 1 mảng hoặc object làm đối số
// hàm mới trả về một mảng hoặc object các phần tử được tìm theo key truyền vào R.pluck

// input là mảng products
getName(products); // output [ 'product 01', 'product 02', 'product 03', 'product 04' ]
getCode(products); // output [ 332434, 332987, 332355, 332876 ]




// call
// example : thực hiện phép nhân 3 số sử dụng R.call
const multiplyThreeNumbers = (a, b, c) => a * b * c;
// - input ở đây gồm 4 đối số
//      - đối số thứ nhất là 1 function
//      - đối số thứ 2, 3, 4 là đối số của đối số thứ nhất
// ở ví dụ này R.call sẽ gọi hàm multiplyThreeNumbers(2,2,2)
R.call(multiplyThreeNumbers, 2, 2, 2); // - output => 8




// apply
// example : tìm số lớn nhẩt, nhỏ nhất sử dụng R.apply
// R.apply sẽ áp dụng một hàm cho một danh sách đối số
// ví dụ bên dưới hàm Math.max và Math.min sẽ được áp dụng với mảng numbers để tìm số lớn nhất và nhỏ nhất
const numbers = [2, 5, 6, 8, 9, 3, 7];

// tìm số lớn nhất
// input - đối số thứ nhất là hàm Math.max - đối số thứ 2 là mảng numbers
// output => 9 tương đương với kết quả của hàm Math.max(2,5,6,8,9,3,7)
R.apply(Math.max, numbers);

//tìm số nhỏ nhất
// input - đối số thứ nhất là hàm Math.min - đối số thứ 2 là mảng numbers
// output => 2 tương đương với kết quả của hàm Math.min(2,5,6,8,9,3,7)
R.apply(Math.min, numbers);




// path
// example : tìm thông tin trong mạng xã hội
// R.path - tham số thứ nhất là mảng các giá trị theo thứ tự sẽ là đường dẫn tới giá trị muốn tìm kiếm
//        - tham số thứ 2 là dữ liệu chứ giá trị muốn tìm kiếm
const socialNetworks = {
    facebook: {
        userA: {phone: '0987987789', age: 18},
        userB: {phone: '0000000000', age: 20},
        userC: {phone: '0000000000', age: 20},
    },
    twitter: {
        userA: {phone: '0987987789', age: 18},
        userB: {phone: '0000000000', age: 20},
        userC: {phone: '0000000000', age: 20},
    }
};

// lấy ra số điện thoại của người dùng A trên mạng xã hội facebook
// input - đối số thứ nhất = ['facebook', 'userA', 'phone'] - đối số thứ 2 là socialNetworks
// dữ liệu sẽ được tìm theo đương dẫn tương ứng với facebook-> userA-> phone
// output => 0987987789
R.path(['facebook', 'userA', 'phone'], socialNetworks);

// lấy ra tuổi của người dùng A trên mạng xã hội twitter
// input - đối số thứ nhất = ['twitter', 'userA', 'age'] - đối số thứ 2 là socialNetworks
// dữ liệu sẽ được tìm theo đương dẫn tương ứng với twitter-> userA-> age
// output => 18
R.path(['twitter', 'userA', 'age'], socialNetworks);




// pick
// example : lấy ra thông tin của người dùng A C D
// R.pick - tham số thứ nhất là mảng chứa các khoá chỉ định
//        - tham số thứ 2 là object
// trả về một bản sao các phần tử theo các khoá trong tham số thứ nhất
// nếu khoá không tồn tại sẽ được bỏ qua
const users = {
    userA: {phone: '0987987789', age: 18},
    userB: {phone: '0000000000', age: 20},
    userC: {phone: '0000000000', age: 20},
}
// input - đối số thứ nhất = ['userA','userC','userD'] - đối số thứ 2 là object users
// hàm sẽ trả về 1 object mới với các khoá tồn tại
// output = {
//   userA: { phone: '0987987789', age: 18 },
//   userC: { phone: '0000000000', age: 20 }
// }
// không có userD vì userD không tồn tại trong users
R.pick(['userA','userC','userD'], users);
