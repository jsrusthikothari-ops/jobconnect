db.employees.insertMany([
	{
		emp_id:101,
		emp_name:"jack",
		emp_deparment:"IT",
		emp_salary:50000,
		emp_city:"Ahmedabad"
	},
	
	
	{
		emp_id:102,
		emp_name:"jacky",
		emp_deparment:"Finance",
		emp_salary:40000,
		emp_city:"Surat"
	},
	
	{
		emp_id:103,
		emp_name:"jammy",
		emp_deparment:"IT",
		emp_salary:60000,
		emp_city:"Rajok"
	},
	
	{
		emp_id:104,
		emp_name:"jenny",
		emp_deparment:"HR",
		emp_salary:30000,
		emp_city:"Ahmedabad"
	},
	
	{
		emp_id:105,
		emp_name:"Arav",
		emp_deparment:"IT",
		emp_salary:50000,
		emp_city:"Vadorara"
	},
	
	
])

db.employee.find({},emp_name:1, department:1, salary:1, _id:0)
db.employee.find({emp_name:/^A/});
db.employee.find({salary:{$gt:40000}});
db.employee.find({},{emp_name:1, salary:1, _id:0}).sort({salary:-1});