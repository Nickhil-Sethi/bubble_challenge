generate_groupings = (num_students,num_groups) ->
	###
	Generates all possible groupings of num_students students 
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

	ValueError : if number of groups exceedes number of students
	###

	if num_students < num_groups
		console.log 'number of groups must be less than or equal to number of students'
		return
	
	groups = ([x] for x in [1..num_groups])
	console.log groups
	# tree of possible groupings is 'num_students' levels deep
	for student_index in [2..num_students]
		# iterating through each group currently in the 'groups' array
		new_groups = []
		for group in groups
			# for each grouping at the bottom level we append 'num_groups' children
			for group_index in [1..num_groups]
				new_group = group.concat([group_index])
				new_groups.push( new_group )
		groups = new_groups
	return groups

console.log generate_groupings(4,3)
