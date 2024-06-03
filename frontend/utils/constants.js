var Constants = {
  get_api_base_url: function () {
    if(location.hostname == 'localhost'){
      return "http://localhost:80/WP_Ilma_Hodzic/backend/";
    } else {
      return "https://shark-app-qoir3.ondigitalocean.app/backend/";
    }
  }
    //API_BASE_URL: "http://localhost:80/WPEmina/furni-backend/",
  };


/*var Constants = {
    API_BASE_URL: "http://localhost:80/WP_Ilma_Hodzic/backend/",
  };*/