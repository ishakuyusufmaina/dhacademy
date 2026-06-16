student-dashboard
	schoolId: str
	schoolName: str
	studentId: str
	fullname: str
	picUrl   : str
	schoolLogoUrl: str
	program  : str
	sessions : [str,..]
	classes	 : [str,..]
	courses  : [course: str,..]



Develop a well designed, mobile first, responsive web app using 
html, css and js that works with the data structure given above.

It implements 
renderDashboard(dashboard), which internally also calls renderCourses(courses), 
among other functions might be needed.

the arrays, with excemption of courses, are represented using select options. 
Each course is rendered with two associated links: 
"BOOK" with url book.html?course={course} and "CLASS" with url class.html?course={course}

It has a future extensible and responsive open/close menu bar. For now, the bar contains:
	Games
	Logout

schoolId is not neccessarily shown.


use a mock databfor the implementation