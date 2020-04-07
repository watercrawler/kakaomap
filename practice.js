const fruits = ['apple', 'orange', 'banana', 'strawberry'];
const f2 = Array.from(document.getElementsByTagName('li'));
const result = fruits.filter(word => word.includes('e'));
console.log(result);
  