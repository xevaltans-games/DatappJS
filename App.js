const express = require("express");
const Data = require("./Data");
const ezyjson = require("ezyjson");
const CreateElementOptions = {
  id: "",
  class: "",
  tag: "",
  defaultHTML: "",
  defaultText: "",
};

const appHeadOptions = {
  importCSS: [""],
};

const editElementOption = {
  selector: "",
  html: "",
  text: "",
  id: "",
  class: "",
};

const AppOptions = {
  name: "Datapp Application",
  hostPort: 3000,
  version: "unknown",
  staticPath: "",
  hostname: "localhost",
};

class App {
  /**
   *
   * @param {AppOptions} params
   * @param {(port: number) => void } readyCallback
   *
   *
   */

  constructor(params = AppOptions, readyCallback) {
    /**
     * @private
     */
    this.appName = params.name || "Datapp Application";
    /**
     * @private
     */
    this.appHostPort = params.hostPort || 3000;
    /**
     * @private
     */
    this.appVersion = params.version || "unknown";
    /**
     * @private
     */
    this._express = express;

    /**
     * @private
     */

    this._database = new ezyjson(`${__dirname}/database.json`);

    this._app = express();
    /**
     * @private
     */
    this.apphostname = params.hostname;

    this._app.use(this._express.static(params.staticPath));

    this._app.get("/", (req, res) => {
      res.sendFile(`${__dirname}/page/preview.html`);
    });

    /**
     * @private
     */
    this._server = this._app.listen(this.appHostPort);

    this._server.on("listening", () => {
      if (readyCallback) {
        readyCallback(this.appHostPort);
      }
    });

    /**
     * @private
     */
    this._io = require("socket.io").listen(this._server);

    this._io.on("connection", (socket) => {
      socket.emit("changeName", this.appName);
    });
  }

  /**
   *
   * @param {string} filePath
   * @returns
   */
  setDatabase(filePath) {
    const database = new ezyjson(filePath);

    this._database = database;

    return true;
  }

  get data() {
    return this._database;
  }
  /**
   *
   * @param {(socket, document) => void} callback
   */
  onConnection(callback) {
    this._io.on("connection", (socket) => {
      callback(socket, document);
    });
  }

  editElement(options = editElementOption) {
    this._io.on("connection", (socket) => {
      socket.emit("editElement", options);
    });
  }

  createElement(options = CreateElementOptions) {
    this._io.on("connection", (socket) => {
      socket.emit("createElement", options);
    });

    return this;
  }

  /**
   *
   * @param {string} selector
   * @returns
   */
  elementGetInputValue(selector) {
    let ret = "";
    this._io.on("connection", (socket) => {
      socket.emit("elementGetValue", selector);
      socket.on("elementGetValue", (val) => {
        ret = val;
      });
    });
    return ret;
  }

  reload() {
    this._io.sockets.emit("RLPage");
  }

  head(options = appHeadOptions) {
    this._io.on("connection", (socket) => {
      socket.emit(
        "importCSS",
        this.apphostname,
        this.appHostPort,
        options.importCSS
      );
    });
  }
  /**
   *
   * @param {string} name
   */
  setName(name) {
    this._io.on("connection", (socket) => {
      socket.emit("changeName", name);
    });
  }

  /**
   * @param {string} selector
   * @param {"text" | "html"} type
   * @param {(content: string) => void} callback
   */
  elementGetContent(selector, type, callback) {
    this._io.on("connection", (socket) => {
      socket.emit("egC", selector, type);
      socket.on("egC2", (content) => {
        callback(content);
      });
    });
  }

  /**
   *
   * @param {string} selector
   * @param {() => void} callback
   */
  elementOnClick(selector, callback) {
    this._io.on("connection", (socket) => {
      socket.emit("elementOnClick", selector);
      socket.on("elementOnClick2", () => {
        callback();
      });
    });
  }
}

module.exports = App;
