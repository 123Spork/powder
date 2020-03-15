VERSION ?= latest
IMAGE_NAME ?= tfp_back
.PHONY: build run

build: Dockerfile
	docker build -t $(IMAGE_NAME):$(VERSION) -f ./DockerFile .

run: Dockerfile
	docker run -t $(IMAGE_NAME):$(VERSION)