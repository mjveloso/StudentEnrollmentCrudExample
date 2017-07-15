(function() {

	angular.module('StudentController', ['StudentService'])
		.controller('StudentController', ['$scope', 'StudentService',
		function($scope,StudentService) {

			$scope.studentData = {};
			$scope.students = {};
			$scope.displayedStudentData = {};
			$scope.modalData = {};

			$scope.fetchAllStudent = function() {
				StudentService.fetchAllStudents()
				.then(function(response) {
					$scope.students = response;
				}).catch(function(error) {
					console.error('error: ', error);
				})
			}

			$scope.fetchAllStudent();

			$scope.showStudentData = function(student) {
				console.debug('student: ', student);
				$scope.studentData.action = "update";
				$('.student-information-container').css('display','inline-block');
				$scope.studentData.studentID = student.studentID;
				$scope.studentData.firstname = student.firstname;
				$scope.studentData.lastname = student.lastname;
				$scope.studentData.age = student.age;
				$scope.studentData.gender = student.gender;
				$scope.studentData.contact_number = student.contact_num;
				$scope.studentData.country = student.country;
				$scope.studentData.address1 = student.address_1;
				$scope.studentData.address2 = student.address_2;
				$scope.studentData.gFirstname = student.gFirstname;
				$scope.studentData.gLastname = student.gLastname;
				$scope.studentData.gContactNumber = student.gContactNumber;
				$scope.studentData.gAddress = student.gAddress;
			}

			$scope.save = function() {
				var data = {
					'firstname': $scope.studentData.firstname,
					'lastname': $scope.studentData.lastname,
					'age': $scope.studentData.age,
					'gender': $scope.studentData.gender,
					'contact_number': $scope.studentData.contact_number,
					'country': $scope.studentData.country,
					'address_1': $scope.studentData.address1,
					'address_2': $scope.studentData.address2,
					'g_firstname': $scope.studentData.gFirstname,
					'g_lastname': $scope.studentData.gLastname,
					'g_address': $scope.studentData.gAddress,
					'g_contact_number': $scope.studentData.gContactNumber
				};
				console.debug('data :', data);
				if($scope.studentData.action == 'update') {
					data.action = $scope.studentData.action;
					data.studentID = $scope.studentData.studentID;
					StudentService.updateStudent(data)
					.then(function(response) {
						console.debug('response: ', response);
					}).catch(function(error) {
						console.error('error: ', error);
					});

				} else {
					data.action = "create";
					StudentService.addStudent(data)
					.then(function(response) {
						console.debug('response: ', response);
						$('#registerModal').modal('hide');
						$('#registrationSuccessModal').modal('show');
						if(response == 'true') {
							$scope.modalData.modal_title = "Successful";
							$scope.modalData.modal_body_message	= "Added New Student";
						} else {
							$scope.modalData.modal_title = "Failed";
							$scope.modalData.modal_body_message = "Something is wrong please contact administrator";
						}
						$scope.fetchAllStudent();
					}).catch(function(error) {
						console.error('error: ', error);
					});
				}
				
			}

		}]);

}) ();