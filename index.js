const R = require('ramda');

console.clear();

// @param
// example

// 0.1 ví dụ chỉ cho biết tên tham số
// @param cho biết tham số thứ nhất là a
// @param cho biết tham số thứ 2 là b
/**
 * @param a
 * @param b
 */
const sum = (a, b) => R.add(a, b);

// @param
// 0.2 ví dụ cho biết tên tham số và kiểu dữ liệu của tham số
// @param cho biết tham số thứ nhất là a có kiểu dữ liệu là number
// @param cho biết tham số thứ 2 là b có kiểu dữ liệu là number
/**
 * @param {number} a
 * @param {number} b
 */
const sub = (a, b) => R.subtract(a, b);

// @param cho biết tham số là name có kiểu dữ liệu là string
/**
 * @param {string} name
 */
const sayHello = name => 'hello ' + name;

// @param
// 0.3 ví dụ cho biết tên tham số, kiểu dữ liệu và mô tả của tham số
// @param cho biết tham số là name có kiểu dữ liệu là string và có mô tả là Somebody's name.
// có thể viết '@param {string} name - Somebody's name.' sẽ dõ dàng hơn, hai đầu dấu '-' có khoảng trắng
/**
 * @param {string} name Somebody's name.
 */
const sayBye = name => 'bye bye ' + name;

// @param - tham số có thuộc tính
// 0.4 ví dụ cho biết tham số có tên là user kiểu dữ liệu là Object mô tả 'personal information'
// thuộc tính userName của tham số có kiểu dữ liệu là string và mô tả 'the name of user'
// tham số có dạng {userName: 'user A', age: 18, ...vvv}
/**
 * @param {Object} user personal information
 * @param {string} user.userName the name of user
 */
const getName = user => user.userName;


// @returns
// example

// 1.1 @returns cho biết dữ liệu trả về có kiểu dữ liệu number
// tương tự như @param @returns cũng có mô tả vd: @returns {number} result of param a + 1
// @returns không có tên >.<
/**
 * @param {number} a
 * @returns {number}
 */
const sum1 = a => a + 1;

// 1.2 trường hợp có nhiều loại kiểu dữ liệu được trả về
// sử dụng | để ngăn cách giữa các kiểu dữ liệu
/**
 * @param {number} a
 * @param {number} b
 * @param {boolean} getAB whether or not to return parameter a and b
 * @returns {number|array} Sum of a and b or an array that contains a, b and the sum of a and b.
 */
const calc = (a, b, getAB) => {
    if (getAB) {
        return [a, b, a + b];
    }
    return a + b;
}


// @property
// example
// tương tự như @param @property cũng cung cấp 3 thông tin
//      - kiểu dữ liệu
//      - tên thuộc tính
//      - mô tả thuộc tính
/**
 * @property {object} content Write a description for the property here
 * @property {string} content.name
 * @property {string} content.version
 * @property {string} content.description
 * @property {string} content.main
 * @property {object} content.scripts
 * @property {string} content.scripts.test
 * @property {string} content.scripts.start
 * @property {string} content.author
 * @property {string} content.license
 * @property {object} content.dependencies
 * @property {string} content.dependencies.express
 * @property {string} content.dependencies.nodemon
 * @property {string} content.dependencies.ramda
 */
const package_json = {
    content: {
        name: "learning_ramdajs",
        version: "1.0.0",
        description: "",
        main: "index.js",
        scripts: {
            test: "echo \"Error: no test specified\" && exit 1",
            start: "nodemon index.js"
        },
        author: "user a",
        license: "ISC",
        dependencies: {
            express: "^4.18.1",
            nodemon: "^2.0.16",
            ramda: "^0.28.0"
        }
    }
}
