import json
import math

from config import input_data

generate_groupings = (num_students,num_groups) ->
  # Generates all possible groupings of num_students students 
  # into int num_groups groups. Implemented via dynamic programming.

  if num_groups > num_students
    alert "num students must be greater than num groups"
    
  groups = ([x] for x in [1..num_groups])
  for student in [1..num_groups]
      groups = (x.concat [c] for c in [1..num_groups] for x in groups)
  return groups


def check_validity(grouping,students,num_groups):
	"""Checks validity of one particular grouping of students against traits in students_dict.

	Parameters
	__________ 

	grouping : type list[int]
		grouping of len(grouping) students into groups

	students : type list[dict]
		list of dictionary (unpacked from json) of students with traits

	Returns
	_______ 

	valid : type bool 
		True if grouping is valid according to requirements."""

	for group_index in xrange(num_groups):
		
		# extract student indices for students in group
		group = [student_idx for student_idx, val in enumerate(grouping) if val == group_index]

		# assert no more than 2 students are noisy
		num_noisy = sum([1 for idx in group if students[idx]['noisy']])
		if num_noisy > 2:
			return False
		
		# assert at least one student understands the material
		num_understand = sum([1 for idx in group if students[idx]['understands']])
		if num_understand < 1:
			return False

		# check if students in group fight
		for student1 in group:
			for student2 in group:
				if students[student1]['name'] in students[student2]['fights_with']:
					return False
	return True

def unpack(group,students,num_groups):
	"""Unpacks a grouping expressed as a list into a list of lists of names (see below).

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
	"""

	unpacked = [ [] for i in xrange(num_groups) ]
	for idx, val in enumerate(group):
		unpacked[val].append(
			students[idx]['name'])
	return unpacked

def evenness(solution):
	"""computes how uniform the group size of a particular solution is.

	Parameters
	__________

	solution : list[list[str]]
		a potential solution to grouping problem

	Returns
	_______ 

	computes evenness (e.g. entropy, scaled by number of students)
	"""
	return -sum([len(x)*math.log(len(x)) for x in solution])

def group_students(data):
	"""Generates all potential groupings of students,
	checks each one for validity, and returns the valid grouping
	with the most even group size. If no valid configuration is found
	returns json object expressing an error.

	Parameters
	__________

	data : type dict
		input data described in question prompt

	Returns
	_______

	json object
		{'grouping' : answer} or {'error' : 'impossible!'}"""

	num_groups = data['groups']
	students = data['students']
	num_students = len(students)
	group_size = num_students//num_groups
	
	# compute list of valid solutions
	solution_stack = []
	student_groupings = generate_groupings(num_students,num_groups)
	for grouping in student_groupings:	
		if check_validity(grouping,students,num_groups):
			solution_stack.append({'grouping' : unpack(grouping,students,num_groups)})
	
	# return error if no valid solutions
	if not solution_stack:
		return json.dumps({'error': 'impossible!'})
	# else, select solution with most even group size
	else:
		objective = -float('infinity')
		argmin = None
		for solution in solution_stack:
			e = evenness(solution['grouping'])
			if e > objective:
				objective = e
				argmin = solution
		return json.dumps(argmin)

if __name__=='__main__':
	print group_students(input_data)