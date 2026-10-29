const themeToggle = document.getElementById("theme-toggle"); // find the button in the HTML by its id

themeToggle.addEventListener("click", function () { // run this function every time the button is clicked
  document.body.classList.toggle("dark"); // if "dark" is on the body, remove it — if it's off, add it
  if (document.body.classList.contains("dark")) { // check whether dark mode is now active
    themeToggle.textContent = "Light mode"; // dark is on, so offer to switch to light
  } else {
    themeToggle.textContent = "Dark mode"; // dark is off, so offer to switch to dark
  }
});

const technologies = [ // a list of 10 objects, one for each technology
  { name: "React", category: "frontend", description: "A JavaScript library for building user interfaces using reusable components." },
  { name: "HTML", category: "frontend", description: "The standard markup language used to structure content on the web." },
  { name: "CSS", category: "frontend", description: "A stylesheet language used to style and lay out web pages." },
  { name: "Node.js", category: "backend", description: "A runtime that lets JavaScript run on a server, outside the browser." },
  { name: "JavaScript", category: "language", description: "The programming language of the web, used in browsers and on servers." },
  { name: "TypeScript", category: "language", description: "A typed superset of JavaScript that catches errors before the code runs." },
  { name: "Python", category: "language", description: "A readable general-purpose language widely used in data science and AI." },
  { name: "React Native", category: "mobile", description: "A framework for building native mobile apps using React and JavaScript." },
  { name: "SQL", category: "backend", description: "A language for querying and managing data in relational databases." },
  { name: "Git", category: "backend", description: "A version control system for tracking and collaborating on source code." },
]; // end of the technologies array

const state = { // one object that holds the current state of both filters
  query: "", // what the user typed in the search box — starts empty
  category: "all", // which category button is active — starts as "all"
};

function render() { // reads state and redraws the list every time something changes
  const list = document.getElementById("tech-list"); // the <ul> where cards get inserted
  const countEl = document.getElementById("tech-count"); // the paragraph that shows "Showing X of 10"

  const filtered = technologies.filter(function (item) { // go through every item and keep only the matching ones
    const matchesQuery = // true if the search text appears anywhere in the name or description
      item.name.toLowerCase().includes(state.query.toLowerCase()) || // check the name
      item.description.toLowerCase().includes(state.query.toLowerCase()); // check the description
    const matchesCategory = // true if no category filter is set, or if this item belongs to the selected category
      state.category === "all" || item.category === state.category;
    return matchesQuery && matchesCategory; // only keep the item if both checks pass
  });

  list.innerHTML = ""; // wipe the list so we can rebuild it from scratch

  if (filtered.length === 0) { // nothing matched the current filters
    const msg = document.createElement("li"); // create a list item to hold the empty-state message
    msg.className = "no-results"; // apply the CSS class for the empty-state style
    msg.textContent = "No technologies match your search."; // write the message
    list.appendChild(msg); // put it in the list
  } else { // at least one item matched
    filtered.forEach(function (item) { // loop through each matching item
      const li = document.createElement("li"); // create a new list item for this card
      li.className = "tech-card"; // apply the card CSS class

      const name = document.createElement("p"); // create the name element
      name.className = "tech-card-name"; // apply the name CSS class
      name.textContent = item.name; // fill it with the technology name

      const category = document.createElement("p"); // create the category label element
      category.className = "tech-card-category"; // apply the category CSS class
      category.textContent = item.category; // fill it with the category value

      const desc = document.createElement("p"); // create the description element
      desc.className = "tech-card-desc"; // apply the description CSS class
      desc.textContent = item.description; // fill it with the description text

      li.appendChild(name); // add the name into the card
      li.appendChild(category); // add the category label into the card
      li.appendChild(desc); // add the description into the card
      list.appendChild(li); // add the finished card into the list on the page
    });
  }

  countEl.textContent = "Showing " + filtered.length + " of " + technologies.length; // update the count line
}

const searchInput = document.getElementById("tech-search"); // find the search input field

searchInput.addEventListener("input", function () { // run every time the user types or deletes a character
  state.query = searchInput.value; // save whatever is in the box to state
  render(); // redraw the list with the updated query
});

const filterButtons = document.querySelectorAll(".filter-btn"); // find all the category buttons

filterButtons.forEach(function (btn) { // attach a click listener to each button
  btn.addEventListener("click", function () {
    state.category = btn.dataset.category; // read the button's data-category attribute and save it to state
    filterButtons.forEach(function (b) {
      b.classList.remove("active"); // remove the highlight from every button
    });
    btn.classList.add("active"); // add the highlight only to the button that was just clicked
    render(); // redraw the list with the updated category
  });
});

render(); // call render once immediately so the full list appears on page load

const contactForm = document.getElementById("contact-form"); // find the contact form

contactForm.addEventListener("submit", function (event) { // run when the user clicks the submit button
  event.preventDefault(); // stop the browser from reloading the page

  const nameInput = document.getElementById("name"); // grab the name input
  const emailInput = document.getElementById("email"); // grab the email input
  const messageInput = document.getElementById("message"); // grab the message textarea

  const nameError = document.getElementById("name-error"); // grab the error paragraph under name
  const emailError = document.getElementById("email-error"); // grab the error paragraph under email
  const messageError = document.getElementById("message-error"); // grab the error paragraph under message

  nameInput.classList.remove("invalid"); // remove red border from a previous failed attempt
  emailInput.classList.remove("invalid"); // same for email
  messageInput.classList.remove("invalid"); // same for message
  nameError.textContent = ""; // clear any previous error text under name
  emailError.textContent = ""; // clear any previous error text under email
  messageError.textContent = ""; // clear any previous error text under message

  let valid = true; // assume everything is fine — flip to false if any check fails

  if (nameInput.value.trim() === "") { // check if the name field is empty
    nameError.textContent = "Please enter your name."; // show the error message
    nameInput.classList.add("invalid"); // turn the field border red
    valid = false; // mark the form as invalid
  }

  if (emailInput.value.trim() === "") { // check if the email field is empty
    emailError.textContent = "Please enter your email address."; // show the error message
    emailInput.classList.add("invalid"); // turn the field border red
    valid = false; // mark the form as invalid
  } else if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) { // basic format check
    emailError.textContent = "Please enter a valid email address."; // show the format error
    emailInput.classList.add("invalid"); // turn the field border red
    valid = false; // mark the form as invalid
  }

  if (messageInput.value.trim() === "") { // check if the message field is empty
    messageError.textContent = "Please enter a message."; // show the error message
    messageInput.classList.add("invalid"); // turn the field border red
    valid = false; // mark the form as invalid
  }

  if (valid) { // only runs if every check above passed
    const successBox = document.getElementById("form-success"); // find the hidden success box
    const summary = document.getElementById("success-summary"); // find the paragraph inside it
    summary.textContent = "Thanks, " + nameInput.value.trim() + ". I'll get back to you soon."; // write the confirmation
    successBox.hidden = false; // make the success box visible
    contactForm.reset(); // clear all the fields
  }
});
