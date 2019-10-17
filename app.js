var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope, $http) {

  //write variables under here  
  $scope.showingLogin = true;
  $scope.lecturerCourses = false;
  $scope.lecturerAssignments = false;
  $scope.studentsCourses = false;
  $scope.studentsAssignments = false;
  $scope.courseInfo = false;
  $scope.addCourseLecturer = false;
  $scope.courseButtonChange = false;
  $scope.showaddcourse = false;
  $scope.courseDirectory = false;

  //Get user_list ID
  $scope.target = "https://caab.sim.vuw.ac.nz/api/roberta/user_list.json";
  $http.get($scope.target)
    .then(function successCall(response) {
      $scope.myData = response.data.users;
      // $scope.feedback = "File loaded";
    }, function errorCall() {
      $scope.feedbackUser = "Failed to load file";
    });

  //Lecturer Courses
  $scope.coursesData = null;
  $scope.targetCourses = "https://caab.sim.vuw.ac.nz/api/roberta/course_directory.json ";
  $scope.dataCourse = $http.get($scope.targetCourses)
    .then(function successCall(response) {
      $scope.coursesData = response.data.courses;
      // $scope.feedback = "File loaded";
    }, function errorCall() {
      $scope.feedbackLC = "Failed to load file";
    });

  //Lecturer Assignments
  $scope.assignmentsData = null;
  $scope.targetAssignments = "https://caab.sim.vuw.ac.nz/api/roberta/assignment_directory.json";
  $http.get($scope.targetAssignments)
    .then(function successCall(response) {
      $scope.assignmentsData = response.data.assignments;
      // $scope.feedback = "File loaded";
    }, function errorCall() {
      $scope.feedbackLA = "Failed to load file";
    });

  //Course Associations
  $scope.target = "https://caab.sim.vuw.ac.nz/api/roberta/course_association_directory.json";
  $scope.courseAssociations = $http.get($scope.target)
    .then(function successCall(response) {
      $scope.courseAssociations = response.data.courseAssociations;
      // $scope.feedback = "File loaded";
    }, function errorCall() {
      $scope.feedbackLC = "Failed to load file";
    });

  //Student Assignments
  $scope.targetAssignment = "https://caab.sim.vuw.ac.nz/api/roberta/assignment.{assignmentId}.json";
  $scope.dataAssignment = $http.get($scope.target)
    .then(function successCall(response) {
      $scope.studentAssignments = response.data.courseAssociations;
      // $scope.feedback = "File loaded";
    }, function errorCall() {
      $scope.feedbackLC = "Failed to load file";
    });

  $scope.courseInfoHideShow = function() {
    if ($scope.courseInfo === true) {
      $scope.courseInfo = false;
    } else if ($scope.courseInfo === false) {
      $scope.courseInfo = true;
    }
  };

  $scope.AddCourseLecturer = function() {
    if ($scope.addCourseLecturer === true) {
      $scope.addCourseLecturer = false;
      $scope.courseButtonChange = true;
    } else if ($scope.addCourseLecturer === false) {
      $scope.addCourseLecturer = true;
      $scope.courseInfo = false;
      $scope.courseButtonChange = false;
    }
  };

  $scope.cancelFunctionCall = function() {
    $scope.showingLogin = false;
    $scope.lecturerCourses = true;
    $scope.courseInfo = false;
    $scope.addCourseLecturer = false;
    $scope.courseButtonChange = true;
  };

  //Show Course Directory
  $scope.courseDirectoryHideShow = function() {
    $scope.studentsCourses = false;
    $scope.studentsAssignments = false;
    $scope.courseDirectory = true;
  };

  // Show Lecturer courses
  $scope.coursesHideShow = function() {
    $scope.lecturerCourses = true;
    $scope.lecturerAssignments = false;
    $scope.courseInfo = false;
    $scope.addCourseLecturer = false;
  };
  //Show Lecturer Assignments
  $scope.assignmentsHideShow = function() {
    $scope.lecturerCourses = false;
    $scope.lecturerAssignments = true;
    $scope.courseInfo = false;
  };
  //Show Student Courses
  $scope.studentCoursesHideShow = function() {
    $scope.studentsCourses = true;
    $scope.studentsAssignments = false;
    $scope.courseInfo = false;
    $scope.courseDirectory = false;
  };
  //Show Student Assignments
  $scope.studentAssignmentsHideShow = function() {
    $scope.studentsAssignments = true;
    $scope.studentsCourses = false;
    $scope.courseInfo = false;
    $scope.courseDirectory = false;
  };
  // Show logout page and hides the rest 
  $scope.logoutHideShow = function() {
    $scope.showingLogin = true;
    $scope.lecturerCourses = false;
    $scope.lecturerAssignments = false;
    $scope.studentsCourses = false;
    $scope.studentsAssignments = false;
    $scope.courseInfo = false;
    $scope.courseDirectory = false;
  };
  //Show Add new course textboxes 
  $scope.addNewCourse = function() {
    $scope.addCourseHideShow = true;
    $scope.editCourseHideShow = false;
  };
  //Hide new course textboxes
  $scope.cancelAddCourse = function() {
    $scope.addCourseHideShow = false;
  };


  //On button click, this method is called to validate login input

  $scope.loginFunctionCall = function() {

    // For each item in myData, run the nested if statements

    for (var i = 0; i < $scope.myData.length; i++) {

      // Check user name input against myData
      if ($scope.usernameInput == $scope.myData[i].LoginName) {
        $scope.feedback = "Correct Username";

        // Check password input against myData
        if ($scope.passwordInput == $scope.myData[i].Password) {

          //If Username and Password are correct, and user type is lecturer, display a message
          if ($scope.myData[i].UserType == "lecturer") {
            $scope.showingLogin = false;
            $scope.lecturerCourses = true;
            break;
          }

          //If Username and Password are correct, and user type is student, display a different message
          else if ($scope.myData[i].UserType == "student") {
            $scope.showingLogin = false;
            $scope.studentsCourses = true;
            break;
          }
          else {
          $scope.userFeedback = window.alert("Incorrect Password or Username");
          break;
        }
          
        } else {
          $scope.userFeedback = window.alert("Incorrect Password or Username");
          break;
        }
        
      }
    }
  };

  // create new course
  $scope.addCourseButton = function() {
    var newCourseData = {
      ID: $scope.courseID,
      Name: $scope.courseName,
      Overview: $scope.courseOverview,
      Year: $scope.courseYear,
      Trimester: $scope.courseTrimester,
      LectureTimes: $scope.courseLeaturetimes,
      LecturerID: $scope.courseLeatureID,
    };
    $scope.coursesData = [];
    $http.post("https://caab.sim.vuw.ac.nz/api/roberta/update.course_directory.json", newCourseData)
      .success(function(response) {
        $scope.targetA = "https://caab.sim.vuw.ac.nz/api/roberta/course_directory.json";
        $scope.coursesData = $http.get($scope.targetA)
          .then(function successCall(response) {
            $scope.coursesData = response.data.courses;
          });
      }, function errorCallback() {
        window.alert("Failed to post course");
      });
  };
  // edit course
  $scope.editCourse = function(courses) {
    $scope.editCourseHideShow = true;
    $scope.addCourseHideShow = false;
    $scope.eCourseID = this.x.ID;
    $scope.eCourseName = this.x.Name;
    $scope.eCourseOverview = this.x.Overview;
    $scope.eCourseYear = this.x.Year;
    $scope.eCourseTrimester = this.x.Trimester;
    $scope.eCourseLeaturetimes = this.x.LectureTimes;
    $scope.eCourseLeatureID = this.x.LecturerID;
  };
  // Update course
  $scope.editCourseButton = function() {
    var newCourseData = {
      ID: $scope.eCourseID,
      Name: $scope.eCourseName,
      Overview: $scope.eCourseOverview,
      Year: $scope.eCourseYear,
      Trimester: $scope.eCourseTrimester,
      LectureTimes: $scope.eCourseLeaturetimes,
      LecturerID: $scope.eCourseLeatureID,
    };
    $scope.coursesData = [];
    $http.post("https://caab.sim.vuw.ac.nz/api/roberta/update.course_directory.json", newCourseData)
      .success(function(response) {
        $scope.targetA = "https://caab.sim.vuw.ac.nz/api/roberta/course_directory.json";
        $scope.coursesData = $http.get($scope.targetA)
          .then(function successCall(response) {
            $scope.coursesData = response.data.courses;
          });
      }, function errorCallback() {
        window.alert("Failed to post course");
      });
  };
  //Hide edit course textboxes
  $scope.cancelEditCourse = function() {
    $scope.editCourseHideShow = false;
  };
  // assignment__________________________________________________________________________________

  // create new Assignment
  $scope.addAssignmentButton = function() {
    var newAssignmentData = {
      ID: $scope.assignemntID,
      Name: $scope.assignemntName,
      Overview: $scope.overview,
      CourseID: $scope.courseIDAsg,
      DueDate: $scope.dueDate,
    };
    $scope.assignmentsData = [];
    $http.post("https://caab.sim.vuw.ac.nz/api/roberta/update.assignment_directory.json", newAssignmentData)
      .success(function(response) {
        $scope.targetb = "https://caab.sim.vuw.ac.nz/api/roberta/assignment_directory.json";
        $scope.assignmentsData = $http.get($scope.targetb)
          .then(function successCall(response) {
            $scope.assignmentsData = response.data.assignments;
          });
      }, function errorCallback() {
        window.alert("Failed to post Assignment");
      });
  };
  //Show Add new Assignment textboxes 
  $scope.addNewAssignment = function() {
    $scope.addAssignmentHideShow = true;
    $scope.editAssignmentHideShow = false;
  };
  // edit Assignment
  $scope.editAssignment = function(assignment) {
    $scope.editAssignmentHideShow = true;
    $scope.addAssignmentHideShow = false;
    $scope.eAssignemntID = this.x.ID;
    $scope.eAssignemntName = this.x.Name;
    $scope.eOverview = this.x.Overview;
    $scope.eCourseIDAsg = this.x.CourseID;
    $scope.eDueDate = this.x.DueDate;
  };
  // Update Assignment
  $scope.editAssignmentButton = function() {
    var updateAssignmentData = {
      ID: $scope.eAssignemntID,
      Name: $scope.eAssignemntName,
      Overview: $scope.eOverview,
      CourseID: $scope.eCourseIDAsg,
      DueDate: $scope.eDueDate,
    };
    $scope.assignmentsData = [];
    $http.post("https://caab.sim.vuw.ac.nz/api/roberta/update.assignment_directory.json", updateAssignmentData)
      .success(function(response) {
        $scope.targetb = "https://caab.sim.vuw.ac.nz/api/roberta/assignment_directory.json";
        $scope.assignmentsData = $http.get($scope.targetb)
          .then(function successCall(response) {
            $scope.assignmentsData = response.data.assignments;
          });
      }, function errorCallback() {
        window.alert("Failed to post Assignment");
      });
  };

  //Hide new Assignment textboxes
  $scope.cancelAddAssignment = function() {
    $scope.addAssignmentHideShow = false;
  };
  //Hide edit Assignment textboxes
  $scope.cancelEditAssignment = function() {
    $scope.editAssignmentHideShow = false;
  };

  // deletecourse
  $scope.deleteCourse = function(x) {
    $scope.coursesData.splice(x, 1);
  };
  // delete assignment
  $scope.deleteAssignment = function(x) {
    // if (confirm("confirming: Delete this Assignemnt?"))
    $scope.assignmentsData.splice(x, 1);
    // var deleteData = {
    //   ID: "INFO226",
    //   Name: "Application Development",
    //   Overview: "An introduction to the use of software languages and tools for rapid application...",
    //   Year: 2018,
    //   Trimester: "1",
    //   LectureTimes: "Thursday 12.40pm",
    //   LecturerID: "1",

    // };

    // This section will post new data to the JSON file on the server
    var postCourseUpdate = $http.delete('https://caab.sim.vuw.ac.nz/api/roberta/delete.assignment.{assignmentId}.json');
    postCourseUpdate.success(function(data, status, headers, config) {
      $scope.feedback = "Posted Sucessfully";
    });
    postCourseUpdate.error(function(data, status, headers, config) {
      $scope.feedback = "Failed to post";
    });
  };



  $scope.target = "https://caab.sim.vuw.ac.nz/api/roberta/assignment_directory.json";
  $scope.promise = $http.get($scope.target)
    .then(function successCall(response) {

      $scope.assignmentdatabase = response.data.assignments;

    }, function errorCall(response) {

      $scope.feedback = "Not Found 404";
    });

  //Assignments student currently has
  filterAssignments = function() {
    $scope.filteredAssignments = [];
    for (var i = 0; i < $scope.assignmentsData.length; i++) {
      if (($scope.studentAssignments[i].CourseID) === true) {
        $scope.filteredAssignments.push($scope.studentAssignments[i].CourseID);
      }
    }
  };

  //Courses student is enrolled in
  filterCourses = function() {
    $scope.filteredCourses = [];
    for (var i = 0; i < $scope.courseAssociations.length; i++) {
      if ($scope.courseAssociations[i].StudentID == $scope.userID) {
        $scope.filteredCourses.push($scope.courseAssociations[i].CourseID);
      }
    }
  };

  $scope.deleteStudentCourses = function(x) {
    if (confirm("Are you sure you want to delete this course?")) {
      $scope.coursedatabase.splice(x, 1);
    }
  };

  // delete assignment
  $scope.deleteStudentCourses = function(x) {
    $scope.courseAssociations.splice(x, 1);

    // This section will post new data to the JSON file on the server
    var postCourseUpdate = $http.delete("https://caab.sim.vuw.ac.nz/api/roberta/course_association_directory.json");
    postCourseUpdate.success(function(data, status, headers, config) {
      $scope.feedback = "Posted Sucessfully";
    });
    postCourseUpdate.error(function(data, status, headers, config) {
      $scope.feedback = "Failed to post";
    });
  };
















































});
// end