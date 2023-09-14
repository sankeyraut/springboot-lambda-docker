# springboot-lambda-docker

## Procedure for building docker image

Run following command in unicorn-store-spring directory

    ```
    mvn clean compile dependency:copy-dependencies -DincludeScope=runtime
    docker build --platform linux/amd64 -t docker-image:test .
    ```

Run the following command from cdk-docker-lambda directory

    ```
    cdk deploy
    ```
