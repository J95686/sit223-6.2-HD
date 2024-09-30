pipeline {
    agent any

    environment {
        NODEJS_TOOL = tool name: 'NodeJS'  // NodeJS environment
        PATH = "${env.NODEJS_TOOL}/bin:${env.PATH}"
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

        stage('Deploy') {  // Basic file deployment or server start
            steps {
                echo 'Deploying application...'
                sh '''
                   # Replace this with the actual deployment steps for your project.
                   # Example: Start a local server or copy files to a deployment directory.
                   echo "Starting the local server..."
                   nohup npm start &  # This starts the Node.js application in the background
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
