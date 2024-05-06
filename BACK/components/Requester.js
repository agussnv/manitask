class Requester {
    constructor() {
      this.httpRequest = "";
      this.response = null;
      console.log("Requester created");
    }
  
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
  }
  