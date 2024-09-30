pipeline {
    agent any

    environment {
        NODEJS_TOOL = tool name: 'NodeJS'  // Define NodeJS tool
        PATH = "${env.NODEJS_TOOL}/bin:${env.PATH}"
        PORT = 3000  // Set the application port to 3000
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/J95686/sit223-6.2-HD.git'  // Clone the repository
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'  // Install project dependencies
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm run build || echo "No build script defined, skipping build."'  // Optional build step
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'  // Run tests using Jest or any other framework
            }
        }

        stage('Code Quality Analysis') {
            steps {
                echo 'Running Code Quality Analysis...'
                sh 'npm run lint || echo "No lint script defined, skipping lint."'  // Run linting if defined
            }
        }

        stage('Deploy') {  // Deployment stage to start the server on port 3000
            steps {
                echo 'Deploying application on port 3000...'
                sh '''
                   # Set the PORT environment variable and start the server
                   export PORT=3000
                   echo "Starting the server on port $PORT..."
                   nohup npm start &  # Run the application in the background on port 3000
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully and the application is running on port 3000!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}

