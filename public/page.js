"use strict"

document.addEventListener("DOMContentLoaded", () => {

  // Grab DOM items
  let global_str = document.getElementById('global_str');
  //TODO Add controls for call later

  // Event Listeners
  document.getElementById('get_info').addEventListener('click', getInfo);
  document.getElementById('set_info').addEventListener('click', setInfo);
  //TODO Add click listener to make call later
  
  function getInfo(){
    let body = {};

    // Actually send it
    makePost('/getInfo', body)
    .then(res => {
      console.log(res);
      global_str.value = res;
    });

    // Clear the DOM to prevent double posts
    global_str.value = "";
  };

  function setInfo(){
    let body = {
      name: global_str.value,
    }

    makePost('/setInfo', body)
    .then(res => {
      console.log(res);
    });

    global_str.value = "";
  };

  //TODO Add event handler to make a call later

  /**
   * Abstract the boring part of making a post request
   * @param route The request destination as a string. ex: '/call'
   * @param body An object of the data to be passed
   * @return A promise for a response object
   */
  function makePost(route, body){
    let request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body)
    };

    return fetch(route, request)
    .then(res => {return res.json()});
  };
});
