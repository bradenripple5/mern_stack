import os
error = "Cannot find module"
output_text = error
missing_packages = []
with open("error.txt","w+") as f:
	f.write(error)
while error in output_text:
	print("while")
	try:
		os.system("node server.js 2>&1 >/dev/null | cat > error.txt")
		with open("error.txt") as f:
			output_text = f.read()
		# print(output_text)
		missing_package = output_text.split(error)[1].split("\n")[0]
		missing_packages.append(missing_package)
		print(f"{missing_package} = missing_package")
		os.system(f"npm install {missing_package}")
	except:
		break
os.system("rm error.txt")
print("packages")
print("\n".join([i for i missing_packages]))
print("installed")