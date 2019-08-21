// variables
const courses = document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      clearCartBtn = document.querySelector('#clear-cart');


// Event Listeners

loadEventListeners();

function loadEventListeners() {
    
    // when a new course is added
   courses.addEventListener('click', buyCourse);

//    remove btn is clicked
   shoppingCartContent.addEventListener('click', removeCourse);

//    clear cart btn
   clearCartBtn.addEventListener('click', clearCart);

//    document ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);

}

// function 

function buyCourse(e) {
    // use delegation to find course that was added to shopping cart
     e.preventDefault();

    if(e.target.classList.contains("add-to-cart")) {
        
        //read the course values
        const course = e.target.parentElement.parentElement;

        // read the values
        getCourseInfo(course);
    }
}
// read html information
function getCourseInfo(course) {
//    create an object with course data
     const courseInfo = {
         image: course.querySelector('img').src,
         title: course.querySelector('h4').textContent,
         price: course.querySelector('.price span').textContent,
         id: course.querySelector('a').getAttribute('data-id')
        }
        // insert into shopping cart
        addIntoCart(courseInfo);
}

// display selected object into shopping cart
function addIntoCart(course) {
    // create a <tr>
    const row = document.createElement('tr');

    // build the template

    row.innerHTML = `
         
         <tr>
              <td><img src="${course.image}" width="120px"></td>
              <td>${course.title} </td>
              <td>${course.price}</td>
              <td><a href="#" class="remove" data-id="${course.id}">X</a></td>
              
         </tr>
 
    `;

    // add into the shopping cart
    shoppingCartContent.appendChild(row);

    // add course into LS 
    saveIntoLocaleStorage(course);
}

// add the courses into LS 
function saveIntoLocaleStorage(course) {
  let courses = getCoursesFromLS();

//   add the course into array
   courses.push(course);

//    konvert

   localStorage.setItem('courses', JSON.stringify(courses));
}

// get the content from the storage
function getCoursesFromLS() {
    let courses;


    // if something exist then we get the value, otherwise create an empty array
    if(localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem("courses"));
    }

    return courses;
}

// remove course from the DOM
function removeCourse(e) {
    let course, courseID;
 
    // remove from DOM
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseID = course.querySelector('a').getAttribute('data-id');

    }
    
    // remove from LS on x

    removeCourseFromLocalStorage(courseID);

}

// remove from the LS

function removeCourseFromLocalStorage(id) {
    //  get the LS data

    let coursesLS = getCoursesFromLS();

    // loop kroz array i nadji index
    coursesLS.forEach(function(courseLS, index) {
       if(courseLS.id === id){
           coursesLS.splice(index, 1);
       }
    });
 
    // add the rest of array
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}



// clears the shopping cart
function clearCart() {
    // shoppingCartContent.innerHTML = '';

    while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
    // clear from LS
    clearLocalStorage();
}

// clears the whole LS

function clearLocalStorage() {
    localStorage.clear();
 }

// loads when doc is ready and print courses into shopping cart
function getFromLocalStorage() {
    let coursesLS = getCoursesFromLS();

    // LOOP throught kurseve i print u kolica
    coursesLS.forEach(function(course) {
        // ?create the table row
        
        const row = document.createElement('tr');

        // print the content
        row.innerHTML = `
        
        <tr>
              <td><img src="${course.image}" width="120px"></td>
              <td>${course.title} </td>
              <td>${course.price}</td>
              <td><a href="#" class="remove" data-id="${course.id}">X</a></td>
              
         </tr>
        
        
        `;
        shoppingCartContent.appendChild(row);
    });
}