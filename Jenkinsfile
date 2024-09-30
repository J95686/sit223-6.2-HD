pipeline {
    agent any

    environment {
        NODEJS_TOOL = tool name: 'NodeJS'  // Adjust if needed
        PATH = "${env.NODEJS_TOOL}/bin:${env.PATH}"
        DOCKER_IMAGE = 'ju12/portfolio-app'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/J95686/sit223-6.2-HD.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Code Quality Analysis') {
            steps {
                echo 'Running Code Quality Analysis...'
                sh 'npm run lint'
            }
        }

       stage('Build Docker Image') {
    steps {
        echo 'Building Docker image...'
        script {
            sh 'bash -c "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."'
        }
    }
}


        stage('Push Docker Image') {
            steps {
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
