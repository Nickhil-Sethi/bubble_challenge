math = require 'mathjs'

# Returns
# _______ 
# groups : type list[list]
#   list of lists, with each element representing an allocation of students
#   into groups e.g. groups = [0, 2, 1] means student 0 is in group 0, 
#   student 1 in group 2, student 2 in group 1.
generate_groupings = (num_students,num_groups) ->
    if num_students < num_groups
        console.log 'number of groups must be less than or equal to number of students'
        return

    groups = ([x] for x in [1..num_groups])
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

# Parameters
# __________ 
# grouping : type list[int]
#     grouping of len(grouping) students into groups
# students : type list[dict]
#     list of dictionary (unpacked from json) of students with traits
# Returns
# _______ 
# valid : type bool 
#     True if grouping is valid according to requirements.
check_validity = (grouping,students,num_groups) ->

    for group_idx in [1..num_groups]
        
        # var group is a list of indices [1,2,3] s.t. students[x]
        group = (student_id for student_id in [0..grouping.length-1] when grouping[student_id] == group_idx)

        # assert no more than 2 students are noisy
        num_noisy = 0
        for student_id, _ in group
            if students[student_id].noisy == true
                num_noisy = num_noisy+1

        if num_noisy > 2
            return false
        
        # assert at least one student understands the material
        num_understand = 0;
        for student_id, _ in group
            if students[student_id].understands == true
                num_understand=num_understand+1;

        if num_understand < 1
            return false

        # check if students in group fight
        for student1 in group
            for student2 in group
                if students[student1].name in students[student2].fights_with
                    return false
    return true

# Parameters
# __________
# group : type list[int]
#     list of group indices, e.g. [1,2] student 0 to group 1, student 1 to group 2
# Returns
# _______ 
# unpacked : type list[list[str]], e.g.
#     [
#         ["Ava","Daniel","Jayden"],
#         ["Madison","Noah","Mia"],
#         ["Olivia","Brianna","Gavin","Kaylee"]
#     ]
unpack = (group,students,num_groups) ->

    unpacked = ( [] for i in [1..num_groups] )
    for group_id, idx in group
        unpacked[group_id-1].push students[idx].name 
    return unpacked

# computes how uniform the group size of a particular solution is.
# Parameters
# __________
# solution : list[list[str]]
#     a potential solution to grouping problem
# Returns
# _______ 
#   entropy (sort of)
evenness = (solution) ->
    entropy = 0
    for element in solution
        entropy = entropy + (element.length)*math.log(element.length)
    return entropy

# Generates all potential groupings of students,
# checks each one for validity, and returns the valid grouping
# with the most even group size. If no valid configuration is found
# returns json object expressing an error.
# Parameters
# __________
# data : type dict
#     input data described in question prompt
# Returns
# _______
# json object
#     {'grouping' : answer} or {'error' : 'impossible!'} 
group_students = (data) ->

    num_groups = data.groups
    students = data.students
    num_students = students.length
    
    console.log('generating groupings...')
    student_groupings = generate_groupings(num_students,num_groups)

    console.log('computing valid solutions...')
    solution_stack = []
    for grouping in student_groupings
        if check_validity(grouping,students,num_groups)
            solution_stack.push({'grouping' : unpack(grouping,students,num_groups)})
    
    # return error if no valid solutions
    if solution_stack.length == 0
        return {error: 'impossible!'}
    else 
        # selecting solution with most even distribution of students
        objective = "Infinity"
        argmin = null
        for solution in solution_stack
            e = evenness(solution.grouping)
            if e < objective
                objective = e
                argmin = solution
            
        return argmin

if require.main == module
    input_data = require('./config.coffee').input_data
    console.log group_students(input_data)