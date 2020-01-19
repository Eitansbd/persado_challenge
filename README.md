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
1. Basic model test for fish


