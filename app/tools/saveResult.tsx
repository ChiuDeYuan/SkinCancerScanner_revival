import { get, save } from "./storage";

const saveResult = (cardResult: Array<number>, userCardAnswer: Array<number>, scanResult: [string, number]) => {
    const currentTime = new Date();
    let savedData = [currentTime.toISOString()];
    console.log("Now: ", savedData);

    get('savedData')
    .then(response=>{
        console.log("response: ", response);

        if(response){
            response.forEach(element => {
                savedData.push(element);
            });
            console.log("update: ", savedData);
        }
        
        save("savedData", savedData);
    })
    .catch(e=>console.log(e));

    save(currentTime.toISOString(), {userCardAnswer: userCardAnswer, scanResult: scanResult, cardResult: cardResult});
}

export default saveResult