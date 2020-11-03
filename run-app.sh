#!/bin/bash

################################################################################
# Help                                                                         #
################################################################################
Help()
{
   # Display Help
   echo "This script starts the backend and frontend of our application."
   echo "You need to have npm installed for this script."
   echo
   echo "Usage: ./run-app.sh [-h|p]"
   echo "Options:"
   echo "h     Print this Help."
   echo "p     Give the path to the route directory of the project."
   echo
   echo	"Examples: 1) ./run-app -p ~/Documents/CineFriends"
   echo	"	  2) ./run-app -p ."
   echo
}

################################################################################
################################################################################
# Main program                                                                 #
################################################################################
################################################################################
# Process the input options.                           			       #
################################################################################
# Get the options
while getopts ":hp:" option; do
   case $option in
      h) # display Help
         Help
         exit;;
      p) # give the path to the route directory
         backend_path="${2}/backend"
	 frontend_package_path="${2}/frontend"
	 frontend_app_path="${2}/frontend/src"

	 # Install backend dependencies (this migth take a few minutes)
	 cd $backend_path
	 npm install				# comment this line if you have everything installed
	 # Run Node.js server in backend
	 # Accesible from http://localhost:8080/api/
	 npm run dev &

	 # This trailing ampersand directs the shell to run the command in the background, 
	 # that is, it is forked and run in a separate sub-shell, as a job, asynchronously. 
	 # The shell will immediately return the return status of 0 for true and continue 
	 # as normal, either processing further commands in a script or returning the cursor 
	 # focus back to the user in a Linux terminal.

	 # Install frontend dependencies (this migth take a few minutes)
	 cd ..
         cd $frontend_package_path
	 npm install &				# comment this line if you have everything installed
	 # Run React.js app
	 # Accesible from http://localhost:3000
         cd ..
	 cd $frontend_app_path
	 npm start
		 
         exit;;
      \?) # incorrect option
         echo "Error: Invalid option"
         exit;;
   esac
done

Help
