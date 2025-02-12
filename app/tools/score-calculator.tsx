const info = require('../constants/information_basic.json')

const ScoreCalculator = (UserAnswer: Array<any>) => {
    var score1 = 0;
    var score2 = 0;
    const MAX1 = 43800536.16
    const MAX2 = 38880 

    const Score1Common = [2,3,4,5,6,7,11,14];
    const Score2Common = [10,12,13,14,15,16,17,18,19,20,22];

    const fitter = (type: string, raw: number) => {
        if(raw <= 90){
            return raw;
        }
        else{
            if(type == "score1"){
                return  90+((raw-90)*10/(MAX1-90));
            }
            else{
                return  90+((raw-90)*10/(MAX2-90));
            }
        }
    }

    ///////////////////////Score 1/////////////////////////
    if(UserAnswer[0] == 0){
        score1 = 0.41;
    }
    else{
        score1 = 0.29;
    }

    Score1Common.forEach(idx => {
        score1 *= info['diagnosis'][idx]['score'][UserAnswer[idx]];
    });
    
    if(UserAnswer[9] == 0){
        if(UserAnswer[6] == 0 || UserAnswer[6] == 1){
            score1 = score1*2;
        }
        else{
            score1 = score1*1.3
        }
    }
    else if(UserAnswer[9] == 1){
        score1 = score1*0.8;
    }
    else{
        score1 = score1*1;
    }

    ////////////////////////////////////////////////////

    //////////////////////Score 2//////////////////////////
    if(UserAnswer[0] == 0){
        if(UserAnswer[1] == 0){
            score2 = 0.045;
        }
        else if(UserAnswer[1] == 1){
            score2 = 0.1;
        }
        else if(UserAnswer[1] == 2){
            score2 = 0.27;
        }
        else{
            score2 = 0.15;
        }
    }
    else{
        if(UserAnswer[1] == 0){
            score2 = 0.07;
        }
        else if(UserAnswer[1] == 1){
            score2 = 0.08;
        }
        else if(UserAnswer[1] == 2){
            score2 = 0.12;
        }
        else{
            score2 = 0.06;
        }
    }

    Score2Common.forEach(idx=>{
        score2 *= info['diagnosis'][idx]['score'][UserAnswer[idx]];
    })

    if(UserAnswer[8] == 0){
        //0=dark 1=in between 2=light

        if(UserAnswer[21] == 0){
            score2 = score2*0.8;
        }
        else if(UserAnswer[21] == 1){
            score2 = score2*3;
        }
        else{
            score2 = score2*1;
        }
    }
    else if(UserAnswer[8] == 2){
        //0=dark 1=in between 2=light

        if(UserAnswer[21] == 0){
            score2 = score2*3;
        }
        else if(UserAnswer[21] == 1){
            score2 = score2*0.8;
        }
        else{
            score2 = score2*1;
        }
    }
    else{
        score2 = score2*1
    }
    ///////////////////////////////////////////////////////////////
    
    return [(fitter("score1", score1)), (fitter("score2", score2))];
}

export default ScoreCalculator;