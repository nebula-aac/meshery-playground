package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gofrs/uuid"
	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/", hello)

	if err := e.Start(":1323"); err != http.ErrServerClosed {
		log.Fatal(err)
	}
}

func hello(c echo.Context) error {
	return c.JSON(http.StatusOK, "OK")
}

type KubernetesAuth struct {
	//
}

type KubernetesCluster struct {
	//
}

type KubernetesServer struct {
	Server string
}

type KubernetesOwnerInfo struct {
	Owner             *uuid.UUID
	CreatedBy         *uuid.UUID
	MesheryInstanceID *uuid.UUID
}

type KubernetesContext struct {
	ID             string
	Name           string
	AuthInfo       KubernetesAuth
	ClusterInfo    KubernetesCluster
	ServerInfo     KubernetesServer
	OwnerInfo      KubernetesOwnerInfo
	DeploymentType string
	Version        string
	UpdatedAt      *time.Time
	CreatedAt      *time.Time
}

type KubeContextLoader interface {
	LoadAllK8sContext(token string) ([]*KubernetesContext, error)
}

func LoadK8sContextsAndPersist(token string) {
	var contexts *KubernetesContext
}

func LoadK8sContexts(token string, provider KubeContextLoader) ([]*KubernetesContext, error) {
	contexts, err := provider.LoadAllK8sContext(token)
	if err != nil {
		log.Fatal("failed to get kubernetes contexts")
		contexts, err = LoadK8sContextsAndPersist(token, provider)
		if err != nil {
			log.Fatal("failed to load kubernetes contexts: ", err.Error())
			return nil, err
		}
	}
	return contexts, nil
}

func RegisterK8sComponents() {}

func HandleContexts() {}

func RetrieveUserToken(ctx context.Context) (string, error) {
	token, ok := ctx.Value(TokenCtxKey).(string)
	if !ok {
		err := fmt.Errorf("failed to retrieve user token")
		return "", err
	}
	return token, nil
}

func KubernetesMiddleware(next func(http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, req *http.Request) {
		ctx := req.Context()
		token, err := RetrieveUserToken(ctx)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		contexts, err := LoadK8sContexts(token, provider)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

type ContextKey string

const TokenCtxKey ContextKey = "token"
