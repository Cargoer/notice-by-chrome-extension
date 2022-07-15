export default function countdown(duration = 3600000) {
  let notification = webkitNotifications.createNotification(
    '../image/icon.png',
    'time to rest!',
    'get off your chair!'
  )
  setTimeout(() => {
    notification.show()
  }, duration)
}

/**
 * 非严格模式
 */


// 题目1 --------------------------
 var name = 'window'

 var person1 = {
   name: 'person1',
   show1: function () {
     console.log(this.name)
   },
   show2: () => console.log(this.name),
   show3: function () {
     return function () {
       console.log(this.name)
     }
   },
   show4: function () {
     return () => console.log(this.name)
   }
 }
 var person2 = { name: 'person2' }
 
 person1.show1()  // person1
 person1.show1.call(person2)  // person2
 
 person1.show2()  // person1 × (window)
 person1.show2.call(person2)  // person1 × (window)
 
 person1.show3()()  // window
 person1.show3().call(person2) // person2
 person1.show3.call(person2)() // window
 
 person1.show4()()  // window × (person1)
 person1.show4().call(person2) // window × (person1)
 person1.show4.call(person2)() // window × (person2)
 // ------------------------------------------

 // 题目2 ----------------------------------------
 /**
 * 非严格模式
 */

var name = 'window'

function Person (name) {
  this.name = name;
  this.show1 = function () {
    console.log(this.name)
  }
  this.show2 = () => console.log(this.name)
  this.show3 = function () {
    return function () {
      console.log(this.name)
    }
  }
  this.show4 = function () {
    return () => console.log(this.name)
  }
}

var personA = new Person('personA')
var personB = new Person('personB')

personA.show1()  // personA
personA.show1.call(personB)  // personB

personA.show2()  // personA
personA.show2.call(personB)  // personA

personA.show3()()  // 
personA.show3().call(personB)
personA.show3.call(personB)()

personA.show4()()
personA.show4().call(personB)
personA.show4.call(personB)()