pipeline {
    environment {
        IMAGE_NAME = "toan3082004/hareta-fe"
        IMAGE_TAG = "latest"
    }
    agent {
        kubernetes {
            yamlFile 'deploy/agent.yaml' 
        }
    }
    
    stages {
        when {
            branch "main"
        }
        stage('Build') {
            steps {
                container("docker") {
                    script {
                        sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
                    }
                }
            }
        }
        stage('Pushing image') {
            steps {
                container("docker") {
                    withCredentials([usernamePassword(credentialsId: 'docker hub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                        sh 'docker tag ${IMAGE_NAME} ${IMAGE_NAME}'
                        sh 'docker push ${IMAGE_NAME}:${IMAGE_TAG}'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                container("kubectl") {
                    withCredentials([file(credentialsId: 'kubernetes-config', variable: 'CONFIG')]) {
                        sh "cp \$CONFIG /.kube/config"
                        sh 'kubectl apply -f deploy/deployment.yaml'
                        sh 'kubectl rollout restart deploy/hareta-frontend -n frontend'
                    }
                }
            }
        }
    }
}