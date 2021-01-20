pipeline {
        agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: hybris
    image: signet/hybris-ant:6.6.0.15_3.0.3-UAT
    command: 
    - /bin/bash
    tty: true	
'''
            label 'sample-java-app'
            idleMinutes 10
            defaultContainer 'jnlp'
        }
    }    

    stages {
        
	stage('Build') {
            steps {
			
		container('hybris') {
			
                    sh '''
                        #!/bin/bash
                        java -version
                        pwd
                        
                        mkdir -p /hybris-commerce-suite/hybris/bin/custom/training/trainingstorefront/
			
                        cp -R /$WORKSPACE/bin/custom/training/trainingstorefront/ /hybris-commerce-suite/hybris/bin/custom/training/trainingstorefront/
			cd /hybris-commerce-suite/hybris/bin/custom/training/trainingstorefront/
			ls
                        cd /hybris-commerce-suite/hybris/bin/platform 
                        . ./setantenv.sh
                        ant server -Dinput.template=develop
                    '''
                 } 
            }   
        }
		
	stage('Unit Test') {
            steps {
		container('hybris') {

                    sh '''

                        cd /hybris-commerce-suite/hybris/bin/platform 
                        . ./setantenv.sh
                        ant unittests
                    '''
                 } 
            }   
        }
		
	stage('Sonarqube') {
            environment {
                scannerHome = tool 'Sonarqube'
            }
            steps {
                withSonarQubeEnv(installationName:'Sonarqube') {
                    sh ''' $scannerHome/bin/sonar-scanner -X -Dsonar.projectName=hybris_sample -Dsonar.projectKey=hybris_sample -Dsonar.projectVersion=1.0 -Dsonar.extensions=trainingstorefront-Dsonar.host.url='https://sonarqube.sgn.devops.accentureanalytics.com/' -Dsonar.login=5f5c96ea5e46f6f532379d711295755534744ef8 -Dsonar.exclusions=file:**/gensrc/**,**/*demo.html,web/webroot/**/web.xml,web/webroot/WEB-INF/config/**/*,web/webroot/WEB-INF/lib/**/*,web/webroot/WEB-INF/views/welcome.jsp,web/webroot/index.jsp,**/*BeforeViewHandler*.java,web/webroot/static/bootstrap/js/*.js,web/webroot/static/theme/js/*.js,web/webroot/signetsmarteditmodule/js/*.js,**/*Constants.java,**/jalo/**,**/email/context/**,**/*Form*.java,web/src/**,**/platform/**,src/com/hybris/yprofile/**,resources/apache-nutch-1.16-custom-code/apache-nutch-1.16/**,**/*.java
                    '''
                }
                timeout(time: 10, unit: 'MINUTES') {
                waitForQualityGate abortPipeline: true
                }
            }
        }
	
		
	}
}
