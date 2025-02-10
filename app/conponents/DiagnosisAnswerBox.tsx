import ExpandableList from "./ExpandableList";
import MonoSelect from "./MonoSelect";

const info = require('../constants/information_basic.json');

const DiagnosisAnswerBox = ({nowCard, setFinishQuestion, sendAnswer, addAnswer}:{nowCard: number ; setFinishQuestion: (f: boolean)=>void ; sendAnswer: boolean ; addAnswer: (a: any)=>void}) => {
  if(info['diagnosis'][nowCard]['type'] == "choose"){
    return(
      <MonoSelect nowCard={nowCard} setFinishQuestion={setFinishQuestion} sendAnswer={sendAnswer} addAnswer={addAnswer}/>
    );
  }
  else if(info['diagnosis'][nowCard]['type'] == "list"){
    return(
      <ExpandableList nowCard={nowCard} setFinishQuestion={setFinishQuestion} sendAnswer={sendAnswer} addAnswer={addAnswer}></ExpandableList>
    );
  }
  else{
    return ;
  }
}

export default DiagnosisAnswerBox;