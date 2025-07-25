
import { InferenceClient } from "@huggingface/inference";


export const handlerApi = async (e,name,cellphone,email,password)=>{

    e.preventDefault();

    const response = await fetch("http://localhost:3000/app/register",{
        
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({email,password})
    });

    const data = await response.json()
    console.log(data)
    alert("Register succesful")

}

export const registerApi = async (e,name,cellphone,email,password)=>{

    e.preventDefault();

    const response = await fetch("http://localhost:3000/app/register",{
        
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({name,cellphone, email,password})
    });

    const data = await response.json()
    console.log(data)
    alert("Register succesful")

}


export const getTokenH = async ()=>{

    

    const response = await fetch("http://localhost:3000/tokeHuggin/token",{
        
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        },
        
    });

    const data = await response.json()
    return data

}

export const chatIA = async(prompts,token) =>{

   
  const response = await  fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn",{
    method:"POST",
       headers:{
        "Authorization":`Bearer ${token}`,
        "Content-Type": "application/json"
       },
       body: JSON.stringify({
        inputs:prompts
       })

    });

    if(!response.ok){
        console.error("Error:", response.status,await response.text())
        return;
    }

    const data = await response.json();

    if(response.ok){
    console.log(data)
        return data[0].summary_text
    }else{
        return null
    }
}


export const Deepseek = async (prompt,token) =>{


const client = new InferenceClient(token.tokenH);

const chatCompletion = await client.chatCompletion({
    provider: "fireworks-ai",
    model: "deepseek-ai/DeepSeek-R1",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
});


console.log(chatCompletion.choices[0].message);
return chatCompletion.choices[0].message.content;
}

export const generateImg = async (prompt)=>{

    const response = await fetch("http://localhost:3000/generate/image",{
        
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
          prompt:prompt
        })
        
    });

    const data = response.json()
    return data

}



