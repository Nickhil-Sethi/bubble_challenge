// Generated by CoffeeScript 1.6.3
(function() {
  var check_validity, evenness, generate_groupings, group_students, input_data, math, unpack,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  math = require('mathjs');

  generate_groupings = function(num_students, num_groups) {
    var group, group_index, groups, new_group, new_groups, student_index, x, _i, _j, _k, _len;
    if (num_students < num_groups) {
      console.log('number of groups must be less than or equal to number of students');
      return;
    }
    groups = (function() {
      var _i, _results;
      _results = [];
      for (x = _i = 1; 1 <= num_groups ? _i <= num_groups : _i >= num_groups; x = 1 <= num_groups ? ++_i : --_i) {
        _results.push([x]);
      }
      return _results;
    })();
    for (student_index = _i = 2; 2 <= num_students ? _i <= num_students : _i >= num_students; student_index = 2 <= num_students ? ++_i : --_i) {
      new_groups = [];
      for (_j = 0, _len = groups.length; _j < _len; _j++) {
        group = groups[_j];
        for (group_index = _k = 1; 1 <= num_groups ? _k <= num_groups : _k >= num_groups; group_index = 1 <= num_groups ? ++_k : --_k) {
          new_group = group.concat([group_index]);
          new_groups.push(new_group);
        }
      }
      groups = new_groups;
    }
    return groups;
  };

  check_validity = function(grouping, students, num_groups) {
    var group, group_idx, num_noisy, num_understand, student1, student2, student_id, _, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, _ref;
    for (group_idx = _i = 1; 1 <= num_groups ? _i <= num_groups : _i >= num_groups; group_idx = 1 <= num_groups ? ++_i : --_i) {
      group = (function() {
        var _j, _ref, _results;
        _results = [];
        for (student_id = _j = 0, _ref = grouping.length - 1; 0 <= _ref ? _j <= _ref : _j >= _ref; student_id = 0 <= _ref ? ++_j : --_j) {
          if (grouping[student_id] === group_idx) {
            _results.push(student_id);
          }
        }
        return _results;
      })();
      num_noisy = 0;
      for (_ = _j = 0, _len = group.length; _j < _len; _ = ++_j) {
        student_id = group[_];
        if (students[student_id].noisy === true) {
          num_noisy = num_noisy + 1;
        }
      }
      if (num_noisy > 2) {
        return false;
      }
      num_understand = 0;
      for (_ = _k = 0, _len1 = group.length; _k < _len1; _ = ++_k) {
        student_id = group[_];
        if (students[student_id].understands === true) {
          num_understand = num_understand + 1;
        }
      }
      if (num_understand < 1) {
        return false;
      }
      for (_l = 0, _len2 = group.length; _l < _len2; _l++) {
        student1 = group[_l];
        for (_m = 0, _len3 = group.length; _m < _len3; _m++) {
          student2 = group[_m];
          if (_ref = students[student1].name, __indexOf.call(students[student2].fights_with, _ref) >= 0) {
            return false;
          }
        }
      }
    }
    return true;
  };

  unpack = function(group, students, num_groups) {
    var group_id, i, idx, unpacked, _i, _len;
    unpacked = (function() {
      var _i, _results;
      _results = [];
      for (i = _i = 1; 1 <= num_groups ? _i <= num_groups : _i >= num_groups; i = 1 <= num_groups ? ++_i : --_i) {
        _results.push([]);
      }
      return _results;
    })();
    for (idx = _i = 0, _len = group.length; _i < _len; idx = ++_i) {
      group_id = group[idx];
      unpacked[group_id - 1].push(students[idx].name);
    }
    return unpacked;
  };

  evenness = function(solution) {
    var element, entropy, _i, _len;
    entropy = 0;
    for (_i = 0, _len = solution.length; _i < _len; _i++) {
      element = solution[_i];
      entropy = entropy + element.length * math.log(element.length);
    }
    return entropy;
  };

  group_students = function(data) {
    var argmin, e, grouping, num_groups, num_students, objective, solution, solution_stack, student_groupings, students, _i, _j, _len, _len1;
    num_groups = data.groups;
    students = data.students;
    num_students = students.length;
    console.log('generating groupings...');
    student_groupings = generate_groupings(num_students, num_groups);
    console.log('computing valid solutions...');
    solution_stack = [];
    for (_i = 0, _len = student_groupings.length; _i < _len; _i++) {
      grouping = student_groupings[_i];
      if (check_validity(grouping, students, num_groups)) {
        solution_stack.push({
          'grouping': unpack(grouping, students, num_groups)
        });
      }
    }
    if (solution_stack.length === 0) {
      return {
        error: 'impossible!'
      };
    } else {
      objective = "Infinity";
      argmin = null;
      for (_j = 0, _len1 = solution_stack.length; _j < _len1; _j++) {
        solution = solution_stack[_j];
        e = evenness(solution.grouping);
        if (e < objective) {
          objective = e;
          argmin = solution;
        }
      }
      return argmin;
    }
  };

  if (require.main === module) {
    input_data = require('./config.coffee').input_data;
    console.log(group_students(input_data));
  }

}).call(this);
