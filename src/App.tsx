import SingIn from './components/SingIn/SingIn';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation.js';
import React, { useState,useEffect }  from 'react';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import ParticlesBg from 'particles-bg';

// api claryfi you can change only the PAT
const PAT = 'c91612b75dd441fb9b8ff01d3741c6d1';
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';


import {Config, UserData } from '@/types'
import { Toaster } from '@/components/ui/toaster';
import BackgroundGradient from './components/backgroundGradient/backgroundGradient.js';

// /api claryfi you can change only the PAT


let config: Config = {
  num: [2, 7],
  rps: 0.1,
  radius: [5, 40],
  life: [1.5, 3],
  v: [2, 3],
  tha: [-40, 40],
  alpha: [0.6, 0],
  scale: [.1, 0.4],
  position: "all",
  color: ["#ffffff", "#ffffff"],
  cross: "dead",
  random: 15,
  g: 0,
};

const SetRequestOptions = (url: string)=>{
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": url
                      // "base64": IMAGE_BYTES_STRING
                  }
              }
          }
      ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};
  return requestOptions
}



function App() {
  
  const INITIAL_USER = {
    id:0,
    name:'',
    email:'',
    entries:'',
    joined:'',
  }
  const [input,setInput] = useState('');
  const [flag,setFlag] = useState(false);
  const [counter,setCounter] = useState(0);
  const[boxes,setBoxes] = useState<number[]>([]);
  const[route,setRoute] = useState("singin");
  const [user,setUser] = useState<UserData>(INITIAL_USER);

  const fetchRank = async function(){
    const data = await fetch("https://facerecognitionapi-tc7x.onrender.com/image",{method: 'PUT',headers: {'Content-Type': 'application/json;charset=utf-8'},body: JSON.stringify({id:user.id})});
    const json = await data.json();
    setCounter(json);
  }

    useEffect(()=>{
      fetchRank();
    },[user])
  
  const isButnClicked = ()=>{
    setFlag(true);
    if(!input){
      alert("To start, please enter a link to the image you want to detect");
    }
  }

  const singOut = ()=>{
    setUser(INITIAL_USER);
    setCounter(0);
    setInput('');
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setInput(e.target.value);
    setBoxes([]);
  }

  const displayBoxes = (boxes:number[])=>{
      setBoxes(boxes);
  }

  const onRouteChange = (state: string)=>{
    setRoute(state);
  }

  const getUser = (user: UserData)=>{
    setUser(user);
  }
  
  if(input && flag){

    const response =new Array();
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", SetRequestOptions(input))
      .then(response => {
        if(response.status == 200) fetchRank();
       return  response.json();
      })
      .then(result => {
          const regions = result.outputs[0].data.regions;
          const image: any = document.getElementById("inputImage")!;
          regions.forEach(region => {
              // Accessing and rounding the bounding box values
              const boundingBox = region.region_info.bounding_box;
              const topRow = boundingBox.top_row.toFixed(3);
              const leftCol = boundingBox.left_col.toFixed(3);
              const bottomRow = boundingBox.bottom_row.toFixed(3);
              const rightCol = boundingBox.right_col.toFixed(3);
              const width = image.width;
              const height = image.height;
  
              response.push({
                    "topRow": topRow * height,
                    "leftCol":leftCol * width, 
                    "bottomRow": height - (bottomRow* height),
                    "rightCol": width-(rightCol * width) 
                  });   
          });
          return response;
      })
      .then(data => {displayBoxes(data)})
      .catch(error => console.log('error', error));
   setFlag(false);
  }



  return (
    <>
      <BackgroundGradient/>
      <Navigation onRouteChange={onRouteChange} singOut={singOut}/>
      <ParticlesBg type='custom' config={config} bg={true}/>
    {  (route === 'singin')
        ?
        <SingIn onRouteChange={onRouteChange} getUser={getUser}/>
        :
        (route === 'register')
        ?
        <Register onRouteChange={onRouteChange} getUser={getUser}/>:
        (route ==="home")?
        <>
          <Logo/>
          <div className='mt-[100px]'>
          <Rank currentRank={counter} name={user?.name}/> 
            <ImageLinkForm onButtonClick={isButnClicked} onChange={onInputChange}/>
            <FaceRecognition imageURL={input} boxes={boxes}/>
          </div>
        </>
        :
        ''
      }
      <Toaster/>
    </>
  );
}

export default App;
