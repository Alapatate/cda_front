pipeline {
    agent any

    environment {
        IMAGE_NAME = "cdafront"
        IMAGE_TAG = "latest"
        CONTAINER_NAME = "react-container"
    }

    triggers {
        githubPush()  // triggers build automatically on push
    }

    stages {

        stage('Start') {
            steps {
                echo "🚀 Pipeline started by ${env.BUILD_USER_ID ?: 'GitHub webhook or anonymous user'}"
                echo "Working directory: ${pwd()}"
            }
        }

        stage('Checkout') {
            steps {
                echo "🔄 Checking out repository from GitHub..."
                git branch: 'main',
                    credentialsId: 'github-creds',
                    url: 'https://github.com/Alapatate/cda_front.git'
                sh 'echo ✅ Git checkout completed'
                sh 'ls -la'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "🐳 Building Docker image: ${IMAGE_NAME}:${IMAGE_TAG}"
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG . || (echo ❌ Docker build failed && exit 1)'
                sh 'echo ✅ Docker image built successfully'
                sh 'docker images | grep $IMAGE_NAME || echo ⚠️ Image not found'
            }
        }

        stage('Deploy Container') {
            steps {
                echo "🚢 Deploying Docker container: ${CONTAINER_NAME}"
                sh '''
                echo "Stopping any existing container..."
                docker stop $CONTAINER_NAME || echo "No existing container to stop"
                docker rm $CONTAINER_NAME || echo "No existing container to remove"

                echo "Running new container..."
                docker run -d -p 3000:80 --name $CONTAINER_NAME $IMAGE_NAME:$IMAGE_TAG || (echo "❌ Failed to run container" && exit 1)

                echo "✅ Container deployed successfully"
                docker ps | grep $CONTAINER_NAME || echo "⚠️ Container not running"
                '''
            }
        }

        stage('End') {
            steps {
                echo "🏁 Pipeline completed successfully!"
            }
        }
    }

    post {
        failure {
            echo "❌ Pipeline failed at stage: ${env.STAGE_NAME}"
        }
        success {
            echo "✅ All stages completed successfully!"
        }
    }
}
