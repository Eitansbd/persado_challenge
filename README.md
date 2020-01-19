# Features

## Crud Happy Path
1. Loading the webpage shows the user a table with 10 fish from the database ordered by common name.
2. Users can add a new fish by clicking on the "Add Fish" button which reveals a form where users can enter the common name, species name and location of a new fish. Upon successful submission, the form is hidden and reset and the new fish is added to the databse and the table. 
3. Users can edit a fish entry by clicking the "Edit" button next to the fish. Clicking the edit button turns the text into a input that the user can change. The user can then save the changes or cancel. Saving the changes saves them on the database and the updated fish replaces the old fish in the table.
4. Users can also delete a fish by clicking the "Delete" button next to the fish. Deleting the fish removes the fish from the database and the table.

## Pagination 
1. When a user loads the webpage only 10 data entries are shown. 
2. The user can click "Load More" to load the next set of 10 fish entries.
3. If no page parameter is supplied, the first ten entries are returned.
4. The page parameter is validated and an error message is returned if the parameter is invalid.

## Sorting
1. The user has the ability to sort the table by common name or species name is ascending or descending order. 
2. When the page is first loaded, the fish are sorted in ascending order by common name.
3. If the table is currently being sorted by common name, clicking on common name toggles the sort direction.
4. If the table is not currently being sorted by common name, clicking on common name sorts the table by common name is ascending order (irrelevant of the previous sort direction of the table and irrelevant of the previous sort direction the previos time the table was sorted by common name)

## Form errors
1. For both the edit and new forms, if the user submits an invalid fish, the server will respond with an object that contains the error messages for each invalid field. Those errors are then shown to the user beneath the input element that the error is associated with.

## Validation
Server-side validation ensures that:
1. common_name is a non-empty string
2. location is a non-empty string
3. species_name is
 - a non-empty string
 - follows the form of having two text only words (excpet for an optional "." as in C. striata )
 - is unique (no two fish can have the same species name but it's not uncommon for fish to share a common name) without considering case sensitivity

## Testing
1. Basic model tests for fish

# Bugs/Future/Discussion
1. When a user clicks "Load More" the next 10 fields are loaded from the databse based on common_name ordering. But, if the user already changed the default order by changing either the sorting field to Species Name or the direction to descending, the data wont be added to the end of the table and will be placed in the correct location based on the current ordering, which probably isn't what the user would expect. 
2. There isn't much validation for common name or location. The user can basically add any string to the database without an error. 
3. Validation is only happening server side - adding client side validation wouldn't be too complicated to implement and the same function can be used to both the new and edit forms. The validation would happen in the form component and the API function would only be called if there are no errors. We would also have to move the form errors from props to state so that they can be changed by the form component if there are any errors. 
4. More tests. If we think of the three major parts of the application they are the Fish model, the Fish controller, and the UI. All we're testing so far is the Fish model. 
5. Naming: The plural of Fish is Fish. That makes the code unclear. It may be smarted to go with the incorrect "Fishes".
6. There's a bug that's requiring me to import react into the file with the ErrorMessage even though it's a function component and shouldn't need it. I think it has to do with webpack but I'm not positive. 
7. Rails uses CSRF tokens to validate client requests. I'm working around that in the app by finding the csrf token and adding it to the axios request (yes, I got that code from StackOverflow). I'm sure there are other, smarter ways of working around this but for this project I went with this simple solution.
8. Because I'm using an html table to display the results, it makes having a form inside complicated because forms can't really be children of tables (except inside of td's). In theory I could have made the form on the whole table and then only submit the data from the editing row, but that would have made controlling the component and submitting the data more complicated. I know that I also could've used Material-UI to build the table which has a way to edit the form inline but I didn't wan't to start going down that path for this project. Ultimately I decided to now use a form element and just implement a "Save" button that mimicks a form submit.  

