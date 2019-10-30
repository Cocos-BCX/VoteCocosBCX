package config

import (
	"sync"
	"time"

	"github.com/jinzhu/configor"
)

var (
	Cfg Configuration
	mu  sync.RWMutex
)

type ServerConfig struct {
	RunMode          string        `json:"run_mode"`
	ListenAddr       string        `json:"listen_addr"`
	LimitConnection  int           `json:"limit_connection"`
	RootRouterPrefix string        `json:"root_router_prefix"`
	ReadTimeout      time.Duration `json:"read_timeout"`
	WriteTimeout     time.Duration `json:"write_timeout"`
	IdleTimeout      time.Duration `json:"idle_timeout"`
	MaxHeaderBytes   int           `json:"max_header_bytes"`
}

type WitnessConfig struct {
	Country string `json:"country"`
	Logo    string `json:"logo"`
}

type CommitteeConfig struct {
	Country string `json:"country"`
	Logo    string `json:"logo"`
}

type (
	Configuration struct {
		Server    ServerConfig               `json:"server"`
		Witnesses map[string]WitnessConfig   `json:"witnesses"`
		Committee map[string]CommitteeConfig `json:"committee"`
	}
)

func Init(file *string) (Configuration, error) {
	mu.Lock()
	defer mu.Unlock()

	err := configor.Load(&Cfg, *file)
	if err != nil {
		return Configuration{}, err
	}
	return Cfg, err
}

func GetConfig() Configuration {
	mu.Lock()
	defer mu.Unlock()
	return Cfg
}
