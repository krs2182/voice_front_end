

document.getElementById("displaytext").style.display = "none";
function searchPhoto()
{
  
  var apigClient = apigClientFactory.newClient({
    apiKey: "ARU4hgAMhl1HiINfI6cZ9cITnmHGpij0DVSEDBf0"
});
  
    var user_message = document.getElementById('note-textarea').value;
    console.log(user_message);
    var body = { };
    var params = {q : user_message};
    var additionalParams = {headers: {
    'Content-Type':"application/json"
  }};
    console.log("Just before api search call");
    apigClient.searchGet(params, body , additionalParams).then(function(res){
        var data = {}
        var data_array = []

        resp_data  = res.data
        length_of_response = resp_data.length;
        console.log(length_of_response, res)
        if(length_of_response == 0)
        {
          document.getElementById("displaytext").innerHTML = "No Images Found !!!"
          document.getElementById("displaytext").style.display = "block";

        }
        var img_doc=document.getElementById("img-container")
        // if(img_doc!=null)
        // {
        //   // while (img_doc.firstChild) {
        //   //   img_doc.removeChild(img_doc.firstChild);
        //   // }
        // }
        resp_data.forEach( function(obj) {

            var img = new Image();
            img.src = obj;
            img.setAttribute("class", "banner-img");
            img.setAttribute("alt", "effy");
            document.getElementById("displaytext").innerHTML = "Images returned are : "
            document.getElementById("img-container").appendChild(img);
            document.getElementById("displaytext").style.display = "block";

          });
        console.log(document.getElementById("img-container").length);
      }).catch( function(result){

      });


      console.log("Just after api search call");
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // reader.onload = () => resolve(reader.result)
    reader.onload = () => {
      let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
}



function uploadPhoto()
{
   // var file_data = $("#file_path").prop("files")[0];
   var file = document.getElementById('file_path').files[0];
   const reader = new FileReader();

   var file_data;
   // var file = document.querySelector('#file_path > input[type="file"]').files[0];
   var encoded_image = getBase64(file).then(
     data => {
     console.log(data)
     var apigClient = apigClientFactory.newClient();

     // var data = document.getElementById('file_path').value;
     // var x = data.split("\\")
     // var filename = x[x.length-1]
     var file_type = file.type + ";base64"
     var label = prompt("Please give custom labels","Custom");
     console.log(label);
     var body = data;
     var params = {"filename" : file.name, "bucket" : "b2photoaws","x-amz-meta-customLabels":label, "Content-Type" : file.type};
     var additionalParams = {};
     apigClient.bucketFilenamePut(params, body , additionalParams).then(function(res){
       if (res.status == 200)
       {
         document.getElementById("uploadText").innerHTML = "Image Uploaded  !!!"
         document.getElementById("uploadText").style.display = "block";
       }
     })
   });

}