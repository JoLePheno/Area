# Build stage
FROM golang:latest AS builder

# Download and install the latest release of dep
ADD https://github.com/golang/dep/releases/download/v0.4.1/dep-linux-amd64 /usr/bin/dep
RUN chmod +x /usr/bin/dep

# Copy the code from the host and compile it
WORKDIR $GOPATH/src/DEV_area_2018/server

COPY Gopkg.toml Gopkg.lock ./

RUN dep ensure --vendor-only -v

COPY . ./


RUN mkdir -p /build && CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /build/app .

# Package stage
FROM alpine:latest

WORKDIR /app

COPY --from=builder /build/app /usr/bin

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

RUN update-ca-certificates

CMD ["app"]