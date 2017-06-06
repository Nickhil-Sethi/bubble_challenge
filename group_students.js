function generate_groupings(num_students,num_groups){

	/* Generates all possible groupings of num_students students 
	into int num_groups groups. Implemented via dynamic programming.

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
		alert('number of groups must be less than or equal to number of students');
	}

	var groups = [ [x] for (x in _.range(num_groups) )];
	for (i=1;1<num_students;i++){
		
		groups = [ for (group of groups) for c in _.range(num_groups) x + [c] ];
			
		}
		
		return groups;
}

generate_groupings(4,2)