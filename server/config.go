package server

type serverConfig struct {
	Port       string `cfg:"port" cfgDefault:"8080"`
	Client     string `cfg:"client" cfgDefault:"static"`
	QBittorent string `cfg:"qBittorent" cfgDefault:"http://localhost:3310"`
	Films      string `cfg:"films" cfgDefault:"Фильмы"`
	Serials    string `cfg:"serials" cfgDefault:"Сериалы"`
}

/**
 * Format host and port as address.
 */
func (c serverConfig) serverAddress() string {
	return ":" + c.Port
}
