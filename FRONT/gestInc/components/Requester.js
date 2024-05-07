class Requester {
  /**
   * Initializes a new instance of the Requester class.
   *
   * @constructor
   */
  constructor() {
    this.httpRequest = "";
    this.response = null;
    console.log("Requester created");
  }

  /**
   * Asynchronously sends an HTTP request to the specified URL and returns the response data.
   *
   * @param {string} [url=null] - The URL to send the request to. If not provided, uses the value of `this.httpRequest`.
   * @return {Promise<Object>} - A Promise that resolves with the response data as a JavaScript object.
   * @throws {string} - If no URL is provided and `this.httpRequest` is empty.
   */
  async request(url = null) {
    if (url) {
      this.httpRequest = url;
    } else {
      if (this.httpRequest.length > 0) {
        console.log(this.httpRequest);
      } else {
        console.log("No url provided on httpRequest");
        throw "No url provided on httpRequest";
      }
    }

    try {
      const response = await fetch(this.httpRequest);
      try {
        const data = await response.json();
        this.response = data;
        console.log(data);
        return this.response;
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async postRequest(data, url = null) {
    if (url) {
      this.httpRequest = url;
    } else {
      if (this.httpRequest.length > 0) {
        console.log(this.httpRequest);
      } else {
        console.log("No url provided on httpRequest");
        throw "No url provided on httpRequest";
      }
    }

    try {
      const response = await fetch(this.httpRequest, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }), // body data type must match "Content-Type" header
      });
      const resp = await response.json();
      return resp;
    } catch (error) {
      throw error;
    }
  }
}
