##################################
# STEP 0 build front             #
##################################

FROM node:20-alpine AS frontend
WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

COPY frontend ./
RUN npm run build

##################################
# STEP 1 build executable binary #
##################################

FROM golang:1.24-alpine AS builder

WORKDIR /go/src/backend

COPY backend/go.mod ./
RUN go mod download

COPY backend ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /go/src/bin/api ./cmd/api

##################################
# STEP 2 build a small image     #
##################################

FROM alpine:3.20

WORKDIR /app

COPY --from=builder /go/src/bin/api ./api
COPY --from=frontend /app/frontend/dist ./frontend-dist

EXPOSE 8080

CMD ["./api"]
