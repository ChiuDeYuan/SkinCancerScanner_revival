import { get, save } from "./storage";

const saveResult = (cardResult: Array<number>, userCardAnswer: Array<number>, scanResult: [string, number]) => {
    const currentTime = new Date();
    let savedData = [currentTime.toISOString()];

    get('savedData')
    .then(response=>{

        if(response){
            response.forEach(element => {
                savedData.push(element);
            });
        }
        
        save("savedData", savedData);
    })
    .catch(e=>console.log(e));

    save(currentTime.toISOString(), {userCardAnswer: userCardAnswer, scanResult: scanResult, cardResult: cardResult, star: false});
}

export default saveResult