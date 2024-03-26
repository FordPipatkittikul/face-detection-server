
const generalImageRecognitionAPI = (req,res,Pat,UserID) => {

    const PAT = Pat;
    const USER_ID = UserID;
    const APP_ID = 'face-detect';
    const MODEL_ID = 'general-image-recognition';
    const IMAGE_URL = req.body.input2;


    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

    const stub = ClarifaiStub.grpc();

    // This will be used by every Clarifai endpoint call
    const metadata = new grpc.Metadata();
    metadata.set("authorization", "Key " + PAT);

    stub.PostModelOutputs(
    {
        user_app_id: {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        model_id: MODEL_ID,
        inputs: [
            { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } }
        ]
    },
    metadata,
    (err, response) => {
        if (err) {
            throw new Error(err);
        }

        if (response.status.code !== 10000) {
            throw new Error("Post model outputs failed, status: " + response.status.description);
        }

        
        const output = response.outputs[0];

        console.log("Predicted concepts:");
        for (const concept of output.data.concepts) {
            console.log(concept.name + " " + concept.value);
        }
        res.json(response)
    }
    
);
    
}

const faceDetectionAPI = (req,res,Pat,UserID) => {

    const PAT = Pat;
    const USER_ID = UserID;
    const APP_ID = 'face-detect';
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = req.body.input;


    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

    const stub = ClarifaiStub.grpc();

    // This will be used by every Clarifai endpoint call
    const metadata = new grpc.Metadata();
    metadata.set("authorization", "Key " + PAT);

    stub.PostModelOutputs(
    {
        user_app_id: {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        model_id: MODEL_ID,
        inputs: [
            { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } }
        ]
    },
    metadata,
    (err, response) => {
        if (err) {
            throw new Error(err);
        }

        if (response.status.code !== 10000) {
            throw new Error("Post model outputs failed, status: " + response.status.description);
        }

        // Since we have one input, one output will exist here
        const output = response.outputs[0];

        console.log("Predicted concepts:");
        for (const concept of output.data.concepts) {
            console.log(concept.name + " " + concept.value);
        }
        res.json(response)
    }
);
    
}



// every time they submit an picture should increase their entries
const handleImage = (req,res,db) => {
    const { id } = req.body;
    db("users").where('id','=', id)
      .increment("entries", 1)
      .returning("entries")
      .then(entries => {
        res.json(entries[0].entries);
      })
      .catch(err => res.status(400).json("unable to get entries"));
}

module.exports = {
    handleImage: handleImage,
    faceDetectionAPI: faceDetectionAPI,
    generalImageRecognitionAPI: generalImageRecognitionAPI 
};