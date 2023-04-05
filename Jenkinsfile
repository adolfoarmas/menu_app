// Function to validate that the message returned from SonarQube is ok
def qualityGateValidation(qg) {
  if (qg.status != 'OK') {
    // emailext body: "WARNING SANTI: Code coverage is lower than 80% in Pipeline ${BUILD_NUMBER}", subject: 'Error Sonar Scan,   Quality Gate', to: "${EMAIL_ADDRESS}"
    return true
  }
  // emailext body: "CONGRATS SANTI: Code coverage is higher than 80%  in Pipeline ${BUILD_NUMBER} - SUCCESS", subject: 'Info - Correct Pipeline', to: "${EMAIL_ADDRESS}"
  return false
}
pipeline {
  agent any

  environment {
    REGISTRY='adolfoarmas90/menu-app'
  }

  stages {
      stage('Preparation') {
        steps {
          echo 'Hello pipeline'
        }
      }
      stage('Checkout') {
        steps {
        // Get Github repo using Github credentials (previously added to Jenkins credentials)
        checkout([$class: 'GitSCM', branches: [[name: '*/to_server']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/adolfoarmas/menu_app.git']]])        }
      }
      stage('Install dependencies') {
        steps {
          echo 'skiping dependencies installation...'
        }
      }
      stage('Unit tests') {
        steps {
          echo 'skiping tests running...'
        }
      }
      stage('Build docker-image') {
        steps {
        //  sh "docker build -t ${REGISTRY}:${BUILD_NUMBER} . "
          sh docker compose build .
        }
      }
      stage('Deploy docker-image') {
        steps {
          // If the Dockerhub authentication stopped, do it again
          //sh 'docker login'
          //sh "docker push ${REGISTRY}:${BUILD_NUMBER}"
          echo 'skip pushing images to docker hub...'
        }
      }
  }
}