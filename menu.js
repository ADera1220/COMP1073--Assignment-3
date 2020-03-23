//delcared array of objects that each represent one menu set
const menu = [
    {
        //each object consists of a title
        //and an object for each menu item
        title: 'Menu 1',
        soup: {
            //menu item objects have 2 properties, name and price
            name: 'Minestrone',
            price: '2.95'
        },
        salad: {
            name: 'Greek Salad',
            price: '4.75'
        },
        LighterFare: {
            name: 'Vegetable Biriyani',
            price: '4.95'
        },
        entree: {
            name: 'Breaded Chicken on a Bun',
            price: '5.95'
        }
    },
    {
        title: 'Menu 2',
        soup: {
            name: 'Red Lentil Dal',
            price: '2.95'
        },
        salad: {
            name: 'Julienne Salad',
            price: '4.75'
        },
        LighterFare: {
            name: 'Madras Chicken Salad Wrap',
            price: '4.95'
        },
        entree: {
            name: 'Fish and Chips',
            price: '5.95'
        }
    },
    {
        title: 'Menu 3',
        soup: {
            name: 'Spicy Squash and Pumpkin',
            price: '2.95'
        },
        salad: {
            name: 'Mediterranean Salad',
            price: '4.75'
        },
        LighterFare: {
            name: 'Ham & Cheese Panini',
            price: '4.95'
        },
        entree: {
            name: 'Butter Chicken with Rice Pilaf',
            price: '5.95'
        }
    },
    {
        title: 'Menu 4',
        soup: {
            name: 'Clam Chowder',
            price: '2.95'
        },
        salad: {
            name: 'Israeli Couscous & Feta Salad',
            price: '4.75'
        },
        LighterFare: {
            name: 'Pulled Pork on a Bun',
            price: '4.95'
        },
        entree: {
            name: 'Matar Paneer & Basmati Rice',
            price: '5.95'
        }
    },
    {
        title: 'Menu 5',
        soup: {
            name: 'Tomato',
            price: '2.95'
        },
        salad: {
            name: 'Caeser Salad',
            price: '4.75'
        },
        LighterFare: {
            name: 'Burger and Fries',
            price: '4.95'
        },
        entree: {
            name: 'Beef and Broccoli with Fried Rice',
            price: '5.95'
        }
    }
];

//app object that puts the various menu items and dynamically adds them to the page
const app = {
    //property 'data' stores the previous 'menu' array in order to better access
    data: menu,
    //property 'currentIndex' represents the currently displayed menu index (starts at 0)
    currentIndex: 0,
    //property that stores the current date
    today: new Date('March 24 2020'),
    //init() will run right when the script is loaded to place the first menu into the page
    init: () => {

        //function starts by calling the available function to prepare the schedules
        app.available();

        //variables and constants for the date checker
        let menuCounter = 0;
        let menuWeek = 0;
        let todaysMenu;
        let today = app.today;
        const dayOfWeek = today.getDay();
        //create 4 const arrays, 1 for each menu item, and grab relevant HTML elements
        const soupElements = [document.querySelector('section#soup h1'), document.querySelector('section#soup p.price')];
        const saladElements = [document.querySelector('section#salad h1'), document.querySelector('section#salad p.price')];
        const lighterFareElements = [document.querySelector('section#lighterfare h1'), document.querySelector('section#lighterfare p.price')];
        const entreeElements = [document.querySelector('section#entree h1'), document.querySelector('section#entree p.price')];
        const menuNav = document.querySelector('nav aside h2');

        //nested while loops check the current date against the schedule
        while(today>app.schedule[menuCounter].start){
            //increments 'menuWeek' only if 'today' is not in that weeks range
            while(today>app.schedule[menuWeek].end){
                menuWeek++;
            }
            //backup counter to prevent infinite loop
            menuCounter++;
        }

        //for loop runs through menus and checks the relevant weekday
        for(let i=0;i<app.data.length;i++){
            //if 'dayOfWeek' is true, stores that menu in 'todaysDate'
            if(app.data[i].available[menuWeek][dayOfWeek-1]){
                todaysMenu = app.data[i];
            }
        }

        if(todaysMenu === undefined){
            app.navButtonsMenu();
        }
        else{
            app.navButtonsDay();
        }

        //if the date is not in the schedule, or if there is no service otherwise, 'todaysDate' remains undefined and the statement will allow the menus to display in sequence and be checked as such using next() and prev()
        if(todaysMenu === undefined){
            menuNav.textContent = `${app.data[app.currentIndex].title}`;
        
            //soup menu item placeholder is replaced with menu item
            soupElements[0].textContent = app.data[app.currentIndex].soup.name;
            soupElements[1].textContent = app.data[app.currentIndex].soup.price;
            
            //salad menu item placeholder is replaced with menu item
            saladElements[0].textContent = app.data[app.currentIndex].salad.name;
            saladElements[1].textContent = app.data[app.currentIndex].salad.price;
            
            //Lighter Fare menu item placeholder is replaced with menu item
            lighterFareElements[0].textContent = app.data[app.currentIndex].LighterFare.name;
            lighterFareElements[1].textContent = app.data[app.currentIndex].LighterFare.price;
            
            //entree menu item placeholder is replaced with menu item
            entreeElements[0].textContent = app.data[app.currentIndex].entree.name;
            entreeElements[1].textContent = app.data[app.currentIndex].entree.price;
        }
        //if the date is in a range, it will display ONLY the days menu (cannot be sequenced)
        else{
            // Get Menu nav and set title to 1st item in data array
            menuNav.textContent = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()} ${todaysMenu.title}`;
        
            //soup menu item placeholder is replaced with menu item
            soupElements[0].textContent = todaysMenu.soup.name;
            soupElements[1].textContent = todaysMenu.soup.price;
            
            //salad menu item placeholder is replaced with menu item
            saladElements[0].textContent = todaysMenu.salad.name;
            saladElements[1].textContent = todaysMenu.salad.price;
            
            //Lighter Fare menu item placeholder is replaced with menu item
            lighterFareElements[0].textContent = todaysMenu.LighterFare.name;
            lighterFareElements[1].textContent = todaysMenu.LighterFare.price;
            
            //entree menu item placeholder is replaced with menu item
            entreeElements[0].textContent = todaysMenu.entree.name;
            entreeElements[1].textContent = todaysMenu.entree.price;
        }
    },
    //nextMenu() will operate on the right arrow button to change the menu to the next sequential index
    nextMenu: () => {
        //if statement to properly decrement the 'currentIndex' property
        if(app.currentIndex<menu.length-1){
            app.currentIndex += 1;
        }
        //else section ensures no decrement takes the property out of the array's bounds
        else{
            app.currentIndex = 0;
        }
        
        //runs the init() function to change the menu, avoids duplicate code
        app.init();
    },
    //prevMenu() will operate on the right arrow button to change the menu to the previous sequential index
    prevMenu: () => {
        //if statement to properly decrement the 'currentIndex' property
        if(app.currentIndex>0){
            app.currentIndex -= 1;
        }
        //else section ensures no decrement takes the property out of the array's bounds
        else{
            app.currentIndex = (app.data.length-1);
        }

        //runs the init() function to change the menu item, avoids duplicate code
        app.init();
    },
    //nextDay() will operate on the right arrow button to change the date +1
    nextDay: () => {
        //increments the day by 1
        app.today.setDate(app.today.getDate()+1);
        //runs the init() function to change the date, avoids duplicate code
        app.init();
    },
    //prevDay() will operate on the right arrow button to change the date -1
    prevDay: () => {
        //decrements the day by 1
        app.today.setDate(app.today.getDate()-1);
        //runs the init() function to change the menu item, avoids duplicate code
        app.init();
    },
    //this function runs at start, creates functionality for the arrow buttons
    navButtonsMenu() {
        //grab the HTML element for the arrow buttons
        const btnElem = [...document.querySelectorAll('aside#menu button')];
        //assign the navButtons to const and add event listeners to run their respective functions
        const leftBtn = btnElem[0];
        const rightBtn = btnElem[1];

        leftBtn.addEventListener('click',app.prevMenu);
        rightBtn.addEventListener('click',app.nextMenu);
    },
    //this function runs at start, creates functionality for the arrow buttons
    navButtonsDay() {
        //grab the HTML element for the arrow buttons
        const btnElem = [...document.querySelectorAll('aside#menu button')];
        //assign the navButtons to const and add event listeners to run their respective functions
        const leftBtn = btnElem[0];
        const rightBtn = btnElem[1];

        leftBtn.addEventListener('click',app.prevDay);
        rightBtn.addEventListener('click',app.nextDay);
    },
    //object list containing the current semester weeks schedules
    schedule: [
        {
            start: new Date('January 27 2020'),
            end: new Date('January 31 2020')
        },
        {
            start: new Date('February 3 2020'),
            end: new Date('February 7 2020')
        },
        {
            start: new Date('February 10 2020'),
            end: new Date('February 14 2020')
        },
        {
            start: new Date('February 17 2020'),
            end: new Date('February 21 2020')
        },
        {
            start: new Date('February 24 2020'),
            end: new Date('February 28 2020')
        },
        {
            start: new Date('March 2 2020'),
            end: new Date('March 6 2020')
        },
        {
            start: new Date('March 9 2020'),
            end: new Date('March 13 2020')
        },
        {
            start: new Date('March 16 2020'),
            end: new Date('March 20 2020')
        },
        {
            start: new Date('March 23 2020'),
            end: new Date('March 27 2020')
        },
        {
            start: new Date('March 31 2020'),
            end: new Date('April 3 2020')
        },
        {
            start: new Date('April 6 2020'),
            end: new Date('April 10 2020')
        },
        {
            start: new Date('April 13 2020'),
            end: new Date('April 17 2020')
        },
    ],
    //function to create and populate each menu's schedule
    available() {
        const menus = [
            [
                //all schedules were derived from the online menu
                //https://www.georgiancollege.ca/wp-content/uploads/BOR-Winter-2020.pdf
                [false, false, false,  true, false],
                [false, false, false, false, true],
                [false, false, false, false, false],
                [false, true, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, true, false, false],
                [false, false, false, true, false],
                [false, false, false, false, true],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, true, false, false, false]
            ],
            [
                //all schedules were derived from the online menu
                //https://www.georgiancollege.ca/wp-content/uploads/BOR-Winter-2020.pdf
                [false, false, false,  false, true],
                [false, false, false, false, false],
                [false, true, false, false, false],
                [false, false, true, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, true, false],
                [false, false, false, false, true],
                [false, false, false, false, false],
                [false, true, false, false, false],
                [false, false, false, false, false],
                [false, false, true, false, false]
            ],
            [
                //all schedules were derived from the online menu
                //https://www.georgiancollege.ca/wp-content/uploads/BOR-Winter-2020.pdf
                [false, false, false,  false, false],
                [false, false, false, false, false],
                [false, false, true, false, false],
                [false, false, false, true, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, true],
                [false, false, false, false, false],
                [false, true, false, false, false],
                [false, false, true, false, false],
                [false, false, false, false, false],
                [false, false, false, true, false]
            ],
            [
                //all schedules were derived from the online menu
                //https://www.georgiancollege.ca/wp-content/uploads/BOR-Winter-2020.pdf
                [false, true, false,  false, false],
                [false, false, true, false, false],
                [false, false, false, true, false],
                [false, false, false, false, true],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, true, false, false, false],
                [false, false, true, false, false],
                [false, false, false, true, false],
                [false, false, false, false, false],
                [false, false, false, false, true]
            ],
            [
                //all schedules were derived from the online menu
                //https://www.georgiancollege.ca/wp-content/uploads/BOR-Winter-2020.pdf
                [false, false, true,  false, false],
                [false, false, false, true, false],
                [false, false, false, false, true],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, true, false, false, false],
                [false, false, true, false, false],
                [false, false, false, true, false],
                [false, false, false, false, true],
                [false, false, false, false, false],
                [false, false, false, false, false]
            ]
        ];

        for (let i=0;i<app.data.length;i++){
            app.data[i].available = menus[i];
        }
        
    }
  }

  //runs the init() functions once script is loaded to prepare the menu for interactivity
  app.init();