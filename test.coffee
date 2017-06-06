generate_groupings = (num_students,num_groups) ->
  if num_students < num_groups
    alert 'number of groups must be less than or equal to number of students'
  groups = ([x] for x in [1..num_groups])
  `for (i=1; i < num_students; i++){
  	console.log(i)
    }`
  return groups