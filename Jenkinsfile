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
          sh '''
            echo 'docker & docker compose information'
            docker info
            docker version
            docker compose version
          '''
        }
      }

      stage('Checkout') {
        steps {
        // Get Github repo using Github credentials (previously added to Jenkins credentials)
        checkout([$class: 'GitSCM', branches: [[name: '*/to_server']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/adolfoarmas/menu_app.git']]])        }
      }

      stage('Unit tests') {
        steps {
          echo 'skiping tests running...'
        }
      }
      stage('Build docker-image') {
        steps {
        //  sh "docker build -t ${REGISTRY}:${BUILD_NUMBER} . "
          sh 'docker compose build'
          sh 'docker compose ps'
        }
      }
      stage('Deploy docker-image') {
        steps {
          // If the Dockerhub authentication stopped, do it again
          sh "docker login"
          sh "docker tag menu_api ${REGISTRY}/menu_api:${BUILD_NUMBER}"
          sh "docker push menu_api ${REGISTRY}/menu_api:${BUILD_NUMBER}"
          sh "docker tag menu_frontend ${REGISTRY}/menu_frontend:${BUILD_NUMBER}"
          sh "docker push menu_frontend ${REGISTRY}/menu_frontend:${BUILD_NUMBER}"
          sh "docker tag menu_db ${REGISTRY}/menu_db:${BUILD_NUMBER}"
          sh "docker push menu_db ${REGISTRY}/menu_db:${BUILD_NUMBER}"
          sh "docker tag menuuu_nginx ${REGISTRY}/menuuu_nginx:${BUILD_NUMBER}"
          sh "docker push menuuu_nginx ${REGISTRY}/menuuu_nginx:${BUILD_NUMBER}"
          // echo 'skip pushing images to docker hub...'
        }
      }
  }
}