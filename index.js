const R = require('ramda')

console.clear()

// input
/**
 * @property {Array} users - employee information list
 * @property {Object} users[] - employee information
 * @property {string} users[].id - employee id
 * @property {string} users[].name - employee name
 * @property {string} users[].position - employee position
 * @property {number} users[].age - employee age
 * @property {string} users[].level employee level
 * @property {number} users[].salary employee salary
 */
const users = [
    {id: 'john', name: "John Smith", position: 'interns', age: 20, level: 'junior', salary: 400},
    {id: 'will', name: "Will Smith", age: 24, position: 'staff', level: 'senior', salary: 2000},
    {id: 'ann', name: "Ann Smith", age: 24, position: 'staff', level: 'senior', salary: 1200},
    {id: 'pete', name: "Pete Peterson", age: 31, position: 'staff', level: 'junior', salary: 800},
];

// filter reduce
/**
 * @param users {Array} - employee information list
 * @returns {Object} - total salary for each level
 */
const totalSalaryByLevel = (users) => {
    const staffs = users.filter(user => user.position === 'staff');
    return staffs.reduce((summary, staff) => {
        if (summary[staff.level]) {
            summary[staff.level] += staff.salary
        } else {
            summary[staff.level] = staff.salary
        }
        return summary;
    }, {})
}

// ramda
/**
 * @param staffs {Array} - staffs information list
 * @returns {Object} - total salary for each level
 */
const summary = R.reduce((summary,staff) => {
    return R.ifElse(
        R.has(staff.level),
        R.over(R.lensProp(staff.level),R.add(staff.salary)),
        R.assoc(staff.level, staff.salary)
    )(summary)
},{})

/**
 * @param users {Array} - employee information list
 * @returns {Array} - staffs information list
 */
const getStaff = R.filter(R.propEq('position','staff'))

/**
 * @param users {Array} - employee information list
 * @returns {Object} - total salary for each level
 */
const ramdaGetSalaryByLevel = R.compose(
    summary,
    getStaff
)

// output { senior: 3200, junior: 800 }