import ExpandableList from "./ExpandableList";
import MonoSelect from "./MonoSelect";
import SkinColorPicker from "./SkinColorPicker";

const info = require('../constants/information_basic.json');

const DiagnosisAnswerBox = ({nowCard, setFinishQuestion, sendAnswer, addAnswer, disable}:{nowCard: number ; setFinishQuestion: (f: boolean)=>void ; sendAnswer: boolean ; addAnswer: (a: any)=>void ; disable: boolean}) => {
  if(info['diagnosis'][nowCard]['type'] == "choose"){
    return(
      <MonoSelect nowCard={nowCard} setFinishQuestion={setFinishQuestion} sendAnswer={sendAnswer} addAnswer={addAnswer}  disable={disable}/>
    );
  }
  else if(info['diagnosis'][nowCard]['type'] == "list"){
    return(
      <ExpandableList nowCard={nowCard} setFinishQuestion={setFinishQuestion} sendAnswer={sendAnswer} addAnswer={addAnswer} disable={disable}></ExpandableList>
    );
  }
  else{
    return(
        <SkinColorPicker nowCard={nowCard} setFinishQuestion={setFinishQuestion} sendAnswer={sendAnswer} addAnswer={addAnswer}  disable={disable}></SkinColorPicker>
    );
  }
}

export default DiagnosisAnswerBox;