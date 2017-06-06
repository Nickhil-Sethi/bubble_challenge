function generate_groupings(num_students,num_groups){

	/* Generates all possible groupings of num_students students 
	into int num_groups groups. 

	Parameters
	__________

	num_students : type int 
		number of students

	num_groups : type int 
		number of groups

	Returns
	_______ 

	groups : type list[list]
		
		list of lists, with each element representing a allocation of students
		into groups e.g. 

		groups = [0, 2, 1]

		means student 0 is in group 0, student 1 in group 2, student 2 in group 1.

	Raises
	______ 

	ValueError : if number of groups exceedes number of students */

	if (num_students < num_groups) {
		console.log('number of groups must be less than or equal to number of students');
		return;
	}

	var groups = [];
	for (g = 1; g <= num_groups; g++ ){
		groups[g-1] = [g];
	}
	console.log(groups)
	
	// tree of possible groupings is 'num_students' levels deep
	for (student_index = 1; 1 <= num_students; student_index++){
		console.log(student_index)
		
		// iterating through each group currently in the 'groups' array
		new_groups = [];
		for (group_index = 0; group_index < groups.length; group_index++){
			
			// for each grouping at the bottom level we append 'num_groups' children
			group = groups[group_index]
			for (g = 1; g <= num_groups; g++)  {
				group.concat(g)
				new_groups.push( group )
			}

		groups = new_groups
		
		}
	}
	
	return groups
}

generate_groupings(4,2)