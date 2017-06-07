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
	
	// tree of possible groupings is 'num_students' levels deep
	for (student_index = 1; student_index < num_students; student_index++){
		// iterating through each group currently in the 'groups' array
		var new_groups = [];
		for (node_index = 0, L = groups.length; node_index < L; node_index++){
			group = groups[node_index]
			// for each grouping at the bottom level we append 'num_groups' children
			for (group_index = 1; group_index <= num_groups; group_index++)  {
				var new_group = group.concat([group_index])
				new_groups.push( new_group )
			}
		}
		groups = new_groups
	}
	return groups
}

function check_validity(grouping,students,num_groups){
	/* Checks validity of one particular grouping of students against traits in students_dict.

	Parameters
	__________ 

	grouping : type list[int]
		grouping of len(grouping) students into groups

	students : type list[dict]
		list of dictionary (unpacked from json) of students with traits

	Returns
	_______ 

	valid : type bool 
		True if grouping is valid according to requirements. */

	for (group_index=0; group_index < num_groups; group_index++){
		
		// extract student indices for students in group
		var group = []
		for (student_idx = 0; student_idx < grouping.length; student_index++){
			if (grouping[student_idx] == group_index){
				group.push(student_idx);
			}
		}

		// assert no more than 2 students are noisy
		var num_noisy = 0
		for (i = 0; i < group.length; i++){
			if (students[i]['noisy']){
				num_noisy++
			}
		}
		if (num_noisy > 2){
			return false
		}
		
		// assert at least one student understands the material
		var num_understand = 0
		for (i=0 ; i < group.length; i++){
			if (students[i]['understands']){
				num_understand++
			}
		}
		if (num_understand < 1){
			return false
		}

		// check if students in group fight
		for (i=0; i < group.length; i++) {
			var student1 = group[i]
			for (j=i+1; j < group.length; j++) {
				var student2 = group[j]
				if (students[student1]['name'] in students[student2]['fights_with']){
					return false
				}
			}
		}

	}
	return true
}
function unpack(group,students,num_groups){
	/* Unpacks a grouping expressed as a list into a list of lists of names (see below).

	Parameters
	__________

	group : type list[int]
		list of group indices, e.g. [1,0] student 0 to group 1, student 1 to group 0

	Returns
	_______ 

	unpacked : type list[list[str]], e.g.
		[
			["Ava","Daniel","Jayden"],
			["Madison","Noah","Mia"],
			["Olivia","Brianna","Gavin","Kaylee"]
		] 
	*/

	var unpacked = []
	for (i=0; i < num_groups; i++){
		unpacked.push( [] )
	}
	for (idx=0; idx < group.length; idx++){
		val = group[idx]
		unpacked[val].push(students[idx]['name'])
	}
	return unpacked
}

function evenness(solution){
	/* computes how uniform the group size of a particular solution is.

	Parameters
	__________

	solution : list[list[str]]
		a potential solution to grouping problem

	Returns
	_______ 

	computes evenness (e.g. entropy, scaled by number of students) */
	var entropy = 0;
	for (x=0; x < solution.length; x++){
		element = solution[x]
		entropy = entropy - (element.length)*math.log(element.length)
	}
	return entropy
}

console.log(generate_groupings(4,2))