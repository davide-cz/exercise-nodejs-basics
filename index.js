import dotenv from "dotenv";
import fs from 'fs'
import path from 'path'
dotenv.config()

const apiKey=process.env.API_KEY

const queryRequest= new URLSearchParams({
    api_key:apiKey,
  }) 

  
  
const funk= async (argomento)=>{
      const jsonFolder= path.resolve('jsonFolder/films.json')
      
      let results
      
      if(!fs.existsSync('films.json')){
        let url;
        if(argomento==='now_playing' || argomento==='top_rated' ){
             url = `https://api.themoviedb.org/3/movie/${argomento}?${queryRequest.toString()}`
        }else{
             url = `https://api.themoviedb.org/3/movie/popular?${queryRequest.toString()}`
        }
        const response = await fetch(url)
        const jsonFilms = await response.text()
        results=JSON.parse(jsonFilms)
        fs.writeFileSync(jsonFolder,jsonFilms)

        }else{
        results=JSON.parse(fs.readFileSync(jsonFolder,'utf-8'))
        }
  console.log(results)
}
const argomento='top_rated'

funk(argomento)



/* .then(resp=>resp.json())
.then(obj=>{
        if(obj.status_code>0)
        {
            console.error("error")
        }else{
            console.log(obj.results[0].title)
            fs.writeFileSync(path.resolve('results.json') ,JSON.stringify(obj.results))

        }
    }) */
