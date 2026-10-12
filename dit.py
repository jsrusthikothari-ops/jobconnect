student = {
	"Name" : "zeel",
	"Age" : 22,
	"city" : "Ahmedabad",
	"cource" : "Msc it"
} 

for key , value in student.items():
	count = list(student.values()).count(value)
	print("Key:" , key)
	print("value:" , value)
	print("count:" , count)
	print()
