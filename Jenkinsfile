pipeline {
    agent any

    environment {
        NODEJS_TOOL = tool('NodeJS')
        PATH = "${env.NODEJS_TOOL}/bin:${env.PATH}"
        PORT = '3000'
    } 

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/J95686/sit223-6.2-HD.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run build'
                    } else {
                        bat 'npm run build'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm test'
                    } else {
                        bat 'npm test'
                    }
                }
            }
        }

        stage('Code Quality Analysis') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run lint'
                    } else {
                        bat 'npm run lint'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    if (isUnix()) {
                        // Linux/Unix Deployment Script
                        sh '''
                            export PORT=3000
                            nohup npm start &
                        '''
                    } else {
                        // Windows Deployment Script
                        bat '''
                            set PORT=3000
                            start /B npm start
                        '''
                    }
                }
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
