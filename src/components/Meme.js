import React from "react";



export default function Form() {

  const [allMemes, setAllMemes] = React.useState([]);//dove salvo i dati dell'API
  const [meme, setMeme] = React.useState({
    //use state oggetto
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  
//fetch API con "meme" come dependence array con .then
  React.useEffect(
    function () {
      
      fetch(`https://api.imgflip.com/get_memes`)
        .then((res) => res.json())
        .then((data) => setAllMemes(data.data.memes));
    },
    []);
    //se voglio farlo con async/await
  /*   React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, []) */
    

  function handleChange(event) {
    const { name, value, type, checked } = event.target;//scompongo l'oggeto con quello che mi serve
    setMeme((prevmeme) => ({
      ...prevmeme,
      [name]: type === "checkbox" ? checked : value,//qua so se è un checkbox o input normale
    }));
  }

  /*  function handleSubmit(event) {  se servisse fare un submit
            event.preventDefault()
            console.log(event)
        } */

  function getMemeImage() {
    //mi prendo un Url random
     //all MemeImages è il mio oggetto messo in useState
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    //uso l'oggetto che ho creato e li cambio l'immagine usando l'url random
    setMeme((prevMeme) => ({
      ...prevMeme, //questo è il mio oggetto intero copiato
      randomImage: url, //qua li cambio solo
    }));
  }
  let party = String.fromCodePoint(127881)//emoji party
  return (
    <div>
    <h5 className="mb-3 text-center">Insert the sentences, take a screenshot and cut out your new <strong>MEME! </strong><span className="party"> {party}</span></h5>
      <div className="row">
        <div className="col ">
          <input
            type="text"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
            className="form-control mt-6"
            placeholder="Top Text"
          />
        </div>
        <div className="col">
          <input
           
            type="text"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
            className="form-control mt-6"
            placeholder="Bottom Text"
          />
        </div>
      </div>
      <button
        onClick={getMemeImage}
        type="button"
        className="btn btn-primary btn-lg btn-block form--button"
      >
        Get a new meme image 🖼
      </button>
      <div className="meme">
          
        <img src={meme.randomImage} className="meme--image" alt="meme" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </div>
  );
}
