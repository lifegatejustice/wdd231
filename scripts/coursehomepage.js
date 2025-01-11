// Get the current year
const currentYear = new Date().getFullYear();

// Get the last modified date
const lastModifiedDate = document.lastModified;

// Select the footer paragraphs
const footerParagraphs = document.querySelectorAll('footer p');

// Select the span for the Nigerian flag
const nigerianFlagSpan = document.querySelector('footer span');

// Add the Nigerian flag image inside the span
nigerianFlagSpan.innerHTML = `<img src="images/flag--ng-4x3.svg" alt="Nigerian flag">`;

// Update the first paragraph with the current year and add a line break
footerParagraphs[0].innerHTML = `© ${currentYear} Lifegate Justice De-Tom`;

// Update the second paragraph with "Nigeria" and the flag
footerParagraphs[1].innerHTML = `Nigeria`;

// Update the third paragraph with the last modified date
footerParagraphs[2].textContent = `Last modified: ${lastModifiedDate}`;


function toggleMenu() {
    const nav = document.querySelector('.navigation');
    const menu = document.getElementById('menu');
    nav.classList.toggle('open');
    menu.classList.toggle('open');
}

// Add event listener for the menu button
document.getElementById('menu').addEventListener('click', toggleMenu);


const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

// Function to display courses based on the provided array
function displayCourses(coursesToDisplay) {
    const coursesContainer = document.getElementById('courses-section');
    coursesContainer.innerHTML = ''; // Clear existing content

    coursesToDisplay.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = 'course ' + (course.completed ? 'completed' : 'not-completed'); // Apply class based on completion status
        courseElement.innerHTML = `<h3>${course.title}</h3> `; // Set the course details
        coursesContainer.appendChild(courseElement); // Append to the container
    });
}

// Function to filter courses based on category
function filterCourses(category) {
    let filteredCourses;
    switch (category) {
        case 'WDD Courses':
            filteredCourses = courses.filter(course => course.subject === 'WDD');
            break;
        case 'CSE Courses':
            filteredCourses = courses.filter(course => course.subject === 'CSE');
            break;
        default:
            filteredCourses = courses;
    }
    displayCourses(filteredCourses);
}


  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('all-courses').addEventListener('click', () => displayCourses(courses));
    document.getElementById('wdd-courses').addEventListener('click', () => filterCourses('WDD Courses'));
    document.getElementById('cse-courses').addEventListener('click', () => filterCourses('CSE Courses'));

    // Display all courses initially
    displayCourses(courses);
});
