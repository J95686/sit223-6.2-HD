pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS', type: 'NodeJS' // Adjust to the NodeJS tool you have configured in Jenkins
        PATH = "${env.NODE_HOME}/bin:${env.PATH}"
        DOCKER_IMAGE = 'your-dockerhub-username/portfolio-app' // Replace with your DockerHub username and repository name
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone the repository
                git 'https://github.com/your-username/sit223-6.2-HD.git' // Change to your repository URL
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install project dependencies
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Build the project (optional based on your configuration)
                echo 'Building the project...'
                sh 'npm run build'  // Ensure you have a build script in your package.json if needed
            }
        }

        stage('Test') {
            steps {
                // Run the tests using Jest
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Code Quality Analysis') {
            steps {
                // Perform Code Quality Analysis (using ESLint, SonarQube, etc.)
                echo 'Running Code Quality Analysis...'
                sh 'npm run lint'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build Docker image
                echo 'Building Docker image...'
                script {
                    sh 'docker build -t ${DOCKER_IMAGE}:${env.BUILD_NUMBER} .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                // Push Docker image to DockerHub
                echo 'Pushing Docker image to DockerHub...'
                script {
                    withCredentials([string(credentialsId: 'dockerhub-credentials-id', variable: 'DOCKERHUB_PASSWORD')]) {
                        sh 'echo ${DOCKERHUB_PASSWORD} | docker login -u your-dockerhub-username --password-stdin'
                        sh 'docker push ${DOCKER_IMAGE}:${env.BUILD_NUMBER}'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // Deploy Docker container
                echo 'Deploying Docker container...'
                script {
                    sh 'docker run -d -p 8080:80 --name portfolio-app ${DOCKER_IMAGE}:${env.BUILD_NUMBER}'
                }
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
